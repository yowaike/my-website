// Обработка кнопок "Подробнее" на странице проектов
document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.project-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectDetails(projectId);
        });
        
        // Добавляем обработку клавиатуры для доступности
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const projectId = this.getAttribute('data-project');
                showProjectDetails(projectId);
            }
        });
    });
    
    // Функция показа деталей проекта
    function showProjectDetails(projectId) {
        const projects = {
            '1': {
                title: 'Личный сайт',
                description: 'Полностью адаптивный личный сайт-портфолио с современным дизайном и доступностью. Реализована семантическая верстка, адаптивный дизайн, доступность (A11y) и валидация форм.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Адаптивный дизайн'],
                features: [
                    'Семантическая HTML-разметка',
                    'Адаптивный дизайн для всех устройств',
                    'Доступность (ARIA-атрибуты, клавиатурная навигация)',
                    'Валидация форм',
                    'Modern CSS с Grid и Flexbox'
                ],
                status: 'Завершен'
            },
            '2': {
                title: 'Калькулятор на C#',
                description: 'Консольное приложение с поддержкой основных математических операций. Реализован парсинг выражений, обработка ошибок и модульная архитектура.',
                technologies: ['C#', '.NET', 'Консольное приложение'],
                features: [
                    'Поддержка основных операций (+, -, *, /)',
                    'Обработка математических выражений',
                    'Валидация ввода',
                    'Модульная архитектура',
                    'Обработка ошибок'
                ],
                status: 'Завершен'
            },
            '3': {
                title: 'Менеджер задач',
                description: 'Полнофункциональный менеджер задач с графическим интерфейсом. Возможность добавления, редактирования, удаления и фильтрации задач.',
                technologies: ['Qt', 'C++', 'GUI', 'SQLite'],
                features: [
                    'Графический интерфейс на Qt',
                    'CRUD операции с задачами',
                    'Фильтрация и сортировка',
                    'Локализация дат',
                    'Экспорт данных'
                ],
                status: 'В разработке'
            }
        };
        
        const project = projects[projectId];
        if (project) {
            showProjectModal(project);
        }
    }
    
    // Функция показа модального окна с деталями проекта
    function showProjectModal(project) {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');
        
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content" role="document">
                <div class="modal-header">
                    <h2 id="modal-title" class="modal-title">${project.title}</h2>
                    <button type="button" class="close-btn" aria-label="Закрыть модальное окно">
                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p><strong>Описание:</strong> ${project.description}</p>
                    
                    <div class="project-status">
                        <strong>Статус:</strong> 
                        <span class="badge ${project.status === 'Завершен' ? 'bg-success' : 'bg-warning'}">
                            ${project.status}
                        </span>
                    </div>
                    
                    <div class="technologies-list">
                        <strong>Технологии:</strong>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => 
                                `<span class="badge bg-primary">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="features-list">
                        <strong>Основные функции:</strong>
                        <ul>
                            ${project.features.map(feature => 
                                `<li>${feature}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close-modal-btn">Закрыть</button>
                </div>
            </div>
        `;
        
        // Добавляем модальное окно в body
        document.body.appendChild(modal);
        
        // Показываем модальное окно
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Обработчики закрытия
        const closeBtn = modal.querySelector('.close-btn');
        const closeModalBtn = modal.querySelector('.close-modal-btn');
        const overlay = modal.querySelector('.modal-overlay');
        
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
        
        // Фокусируемся на кнопке закрытия
        setTimeout(() => {
            closeBtn.focus();
        }, 100);
    }
});