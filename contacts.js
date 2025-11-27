// Валидация формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Добавляем обработчики для реального времени валидации
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Валидируем все поля
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Показываем состояние загрузки
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="bi bi-hourglass-split" aria-hidden="true"></i> Отправка...';
            
            // Имитация отправки формы
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="bi bi-send" aria-hidden="true"></i> Отправить сообщение';
            }, 1500);
        } else {
            // Фокусируемся на первом невалидном поле
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
    
    function validateField(field) {
        let isValid = true;
        
        // Проверка обязательных полей
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
        }
        
        // Проверка email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
            }
        }
        
        if (!isValid) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            field.setAttribute('aria-invalid', 'false');
        }
        
        return isValid;
    }
    
    function showSuccessMessage() {
        // Создаем доступное уведомление об успехе
        const alert = document.createElement('div');
        alert.className = 'card bg-success text-white mt-4';
        alert.setAttribute('role', 'alert');
        alert.innerHTML = `
            <div class="card-body">
                <strong>Успешно!</strong> Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.
                <button type="button" class="btn-close btn-close-white float-end" onclick="this.parentElement.parentElement.remove()" aria-label="Закрыть"></button>
            </div>
        `;
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(alert, form.nextSibling);
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
});
// Захват фокуса в модальных окнах
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });
}