// ==========================================
// ЗАДАНИЕ 1: Базовые обработчики событий
// ==========================================

function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    const btn = event.target;

    output.innerHTML = `
        Тип события: ${event.type}<br>
        Координаты клика: X=${event.clientX}, Y=${event.clientY}<br>
        Target элемент: ${event.target.tagName}
    `;

    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
}

function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');

    switch(event.type) {
        case 'mouseenter':
            box.style.background = '#e74c3c';
            break;
        case 'mouseleave':
            box.style.background = '#3498db';
            break;
        case 'mousemove':
            output.textContent = `Координаты мыши: X=${event.offsetX}, Y=${event.offsetY}`;
            break;
    }
}

function setupBasicEvents() {
    const btn = document.getElementById('basic-btn');
    const box = document.getElementById('color-box');

    if (btn) btn.addEventListener('click', handleBasicClick);

    if (box) {
        box.addEventListener('mouseenter', handleMouseEvents);
        box.addEventListener('mouseleave', handleMouseEvents);
        box.addEventListener('mousemove', handleMouseEvents);
    }
}

// ==========================================
// ЗАДАНИЕ 2: События клавиатуры
// ==========================================

function handleKeyEvents(event) {
    const output = document.getElementById('key-output');

    output.innerHTML = `
        key: ${event.key}<br>
        code: ${event.code}<br>
        ctrlKey: ${event.ctrlKey}<br>
        altKey: ${event.altKey}<br>
        shiftKey: ${event.shiftKey}
    `;

    // Комбинации клавиш
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        output.innerHTML += '<br><strong>Обнаружено Ctrl+S! Стандартное поведение предотвращено.</strong>';
    }
    if (event.altKey && event.key === 'c') {
        event.preventDefault();
        output.innerHTML += '<br><strong>Обнаружено Alt+C! Стандартное поведение предотвращено.</strong>';
    }
    if (event.shiftKey && event.key === 'A') {
        event.preventDefault();
        output.innerHTML += '<br><strong>Обнаружено Shift+A! Стандартное поведение предотвращено.</strong>';
    }
}

function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    if (input) {
        input.addEventListener('keydown', handleKeyEvents);
    }
}

// ==========================================
// ЗАДАНИЕ 3: Делегирование событий
// ==========================================

function handleDelegationClick(event) {
    const output = document.getElementById('delegation-output');

    // Клик на кнопку удаления
    if (event.target.classList.contains('delete')) {
        const item = event.target.closest('.item');
        if (item) {
            item.remove();
            output.textContent = 'Элемент удалён';
        }
        return;
    }

    // Клик на элемент списка
    const item = event.target.closest('.item');
    if (item) {
        item.classList.toggle('selected');

        const selected = document.querySelectorAll('.item.selected');
        output.textContent = `Выбрано элементов: ${selected.length}`;
    }
}

function addNewItem() {
    const list = document.getElementById('item-list');
    if (!list) return;

    const newId = Date.now();
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.id = newId;
    item.innerHTML = `Элемент ${newId} <span class="delete">✕</span>`;

    list.appendChild(item);
}

function setupDelegationEvents() {
    const list = document.getElementById('item-list');
    const addBtn = document.getElementById('add-item-btn');

    if (list) {
        list.addEventListener('click', handleDelegationClick);
    }

    if (addBtn) {
        addBtn.addEventListener('click', addNewItem);
    }
}

// ==========================================
// ЗАДАНИЕ 4: Предотвращение поведения
// ==========================================

function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    const link = event.target;

    output.textContent = `Переход по ссылке предотвращён! URL: ${link.href}`;

    link.classList.add('shake');
    setTimeout(() => link.classList.remove('shake'), 300);
}

function preventFormSubmit(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    const input = document.getElementById('form-input');

    if (!input.value.trim()) {
        output.textContent = 'Ошибка: поле не должно быть пустым!';
        output.style.color = '#e74c3c';
        return;
    }

    output.textContent = `Форма отправлена (эмуляция). Данные: "${input.value}"`;
    output.style.color = '#27ae60';
    input.value = '';
}

function setupPreventionEvents() {
    const link = document.getElementById('prevent-link');
    const form = document.getElementById('prevent-form');

    if (link) link.addEventListener('click', preventLinkDefault);
    if (form) form.addEventListener('submit', preventFormSubmit);
}

// ==========================================
// ЗАДАНИЕ 5: Кастомные события
// ==========================================

function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: { message: 'Привет от кастомного события!' }
    });
    document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    output.textContent = `Получено: ${event.detail.message}`;

    const btn = document.getElementById('trigger-custom');
    if (btn) {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 500);
    }
}

function setupMultipleListeners() {
    document.addEventListener('customAction', () => {
        console.log('Обработчик 1: Событие получено');
    });
    document.addEventListener('customAction', () => {
        console.log('Обработчик 2: Событие обработано');
    });
    document.addEventListener('customAction', () => {
        console.log('Обработчик 3: Завершение обработки');
    });
}

function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);

    const triggerBtn = document.getElementById('trigger-custom');
    const multipleBtn = document.getElementById('multiple-listeners');

    if (triggerBtn) triggerBtn.addEventListener('click', triggerCustomEvent);
    if (multipleBtn) multipleBtn.addEventListener('click', setupMultipleListeners);
}

// ==========================================
// ЗАДАНИЕ 6: События загрузки и ошибок
// ==========================================

function loadImageWithEvents() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading
