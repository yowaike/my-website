// Обработка кнопки "Добавить запись" в дневнике
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            showAddTaskModal();
        });
        
        // Добавляем обработку клавиатуры для доступности
        addTaskBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showAddTaskModal();
            }
        });
    }
    
    function showAddTaskModal() {
        // Создаем модальное окно для добавления записи
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'add-task-title');
        
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content" role="document">
                <div class="modal-header">
                    <h2 id="add-task-title" class="modal-title">Добавить новую запись</h2>
                    <button type="button" class="close-btn" aria-label="Закрыть модальное окно">
                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addTaskForm">
                        <div class="mb-3">
                            <label for="taskDate" class="form-label">Дата</label>
                            <input type="date" class="form-control" id="taskDate" required>
                        </div>
                        <div class="mb-3">
                            <label for="taskTitle" class="form-label">Заголовок *</label>
                            <input type="text" class="form-control" id="taskTitle" required 
                                   placeholder="Например: Изучение React hooks">
                        </div>
                        <div class="mb-3">
                            <label for="taskDescription" class="form-label">Описание *</label>
                            <textarea class="form-control" id="taskDescription" rows="4" required
                                      placeholder="Опишите, что вы изучили или сделали..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="taskStatus" class="form-label">Статус</label>
                            <select class="form-select" id="taskStatus">
                                <option value="success">Завершено</option>
                                <option value="warning">В процессе</option>
                                <option value="secondary">В планах</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close-modal-btn">Отмена</button>
                    <button type="button" class="btn btn-primary" id="saveTaskBtn">
                        <i class="bi bi-check-lg" aria-hidden="true"></i> Сохранить
                    </button>
                </div>
            </div>
        `;
        
        // Добавляем модальное окно в body
        document.body.appendChild(modal);
        
        // Устанавливаем сегодняшнюю дату по умолчанию
        const today = new Date().toISOString().split('T')[0];
        const dateInput = modal.querySelector('#taskDate');
        if (dateInput) {
            dateInput.value = today;
        }
        
        // Показываем модальное окно
        setTimeout(() => {
            modal.classList.add('show');
            // Фокусируемся на первом поле
            const titleInput = modal.querySelector('#taskTitle');
            if (titleInput) {
                titleInput.focus();
            }
        }, 10);
        
        // Обработчики закрытия
        const closeBtn = modal.querySelector('.close-btn');
        const closeModalBtn = modal.querySelector('.close-modal-btn');
        const overlay = modal.querySelector('.modal-overlay');
        const saveTaskBtn = modal.querySelector('#saveTaskBtn');
        
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Обработчик сохранения
        saveTaskBtn.addEventListener('click', function() {
            const title = modal.querySelector('#taskTitle').value.trim();
            const description = modal.querySelector('#taskDescription').value.trim();
            const status = modal.querySelector('#taskStatus').value;
            
            if (!title || !description) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            addNewTask({
                date: modal.querySelector('#taskDate').value,
                title: title,
                description: description,
                status: status
            });
            
            closeModal();
        });
        
        // Закрытие по Escape
        function handleEscape(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        }
        
        document.addEventListener('keydown', handleEscape);
        
        // Удаляем обработчик при закрытии
        modal.addEventListener('close', () => {
            document.removeEventListener('keydown', handleEscape);
        });
    }
    
    function addNewTask(taskData) {
        // Форматируем дату
        const date = new Date(taskData.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        });
        
        // Создаем новую запись
        const newTask = document.createElement('article');
        newTask.className = 'diary-item';
        
        // Определяем цвет статуса
        let statusClass = 'bg-success';
        let statusText = 'Завершено';
        
        if (taskData.status === 'warning') {
            statusClass = 'bg-warning';
            statusText = ' В процессе ';
        } else if (taskData.status === 'secondary') {
            statusClass = 'bg-secondary';
            statusText = ' В планах';
        }
        
        newTask.innerHTML = `
            <h3 class="h5">${formattedDate} - ${taskData.title}</h3>
            <p>${taskData.description}</p>
            <span class="badge ${statusClass}">${statusText}</span>
        `;
        
        // Добавляем в начало списка задач
        const tasksContainer = document.querySelector('.card-body');
        const firstTask = tasksContainer.querySelector('.diary-item');
        if (firstTask) {
            tasksContainer.insertBefore(newTask, firstTask);
        } else {
            tasksContainer.appendChild(newTask);
        }
        
        // Показываем уведомление об успехе
        showSuccessMessage('Запись успешно добавлена!');
    }
    
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'card bg-success text-white mt-4';
        alert.setAttribute('role', 'alert');
        alert.innerHTML = `
            <div class="card-body">
                <strong>Успешно!</strong> ${message}
                <button type="button" class="btn-close btn-close-white float-end" 
                        onclick="this.parentElement.parentElement.remove()" 
                        aria-label="Закрыть"></button>
            </div>
        `;
        
        const container = document.querySelector('.container');
        const firstSection = container.querySelector('.section');
        if (firstSection) {
            container.insertBefore(alert, firstSection);
        } else {
            container.appendChild(alert);
        }
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
});