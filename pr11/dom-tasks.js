// ==========================================
// ЗАДАНИЕ 1: Создание и вставка элементов
// ==========================================

function createCard(title, content) {
    const target = document.getElementById('target1');
    if (!target) return;

    const card = document.createElement('div');
    card.className = 'card';

    const h4 = document.createElement('h4');
    h4.textContent = title;

    const p = document.createElement('p');
    p.textContent = content;

    card.appendChild(h4);
    card.appendChild(p);
    target.appendChild(card);
}

function createList(items) {
    const target = document.getElementById('target1');
    if (!target) return;

    const ol = document.createElement('ol');

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });

    target.appendChild(ol);
}

// ==========================================
// ЗАДАНИЕ 2: Навигация по DOM
// ==========================================

function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent ? parent.children.length : 0;
}

function findSpecialChild() {
    const special = document.querySelector('#parent-element .special');
    return special ? special.textContent : '';
}

function getParentBackground() {
    const child = document.querySelector('.child');
    if (!child) return '';
    const parent = child.parentElement;
    return getComputedStyle(parent).backgroundColor;
}

// ==========================================
// ЗАДАНИЕ 3: Работа с классами и стилями
// ==========================================

function setupStyleToggle() {
    const button = document.getElementById('toggle-style');
    const target = document.getElementById('style-target');
    if (!button || !target) return;

    button.addEventListener('click', () => {
        target.classList.toggle('active-style');
    });
}

function changeHeaderColor() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    header.style.backgroundColor = randomColor;
}

function animateElement() {
    const target = document.getElementById('style-target');
    if (!target) return;

    target.style.transition = 'all 0.5s ease';
    target.style.transform = 'scale(1.1)';
    target.style.opacity = '0.7';

    setTimeout(() => {
        target.style.transform = 'scale(1)';
        target.style.opacity = '1';
    }, 500);
}

// ==========================================
// ЗАДАНИЕ 4: Обработка событий
// ==========================================

function setupClickCounter() {
    const button = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    if (!button || !counter) return;

    let count = 0;
    button.addEventListener('click', () => {
        count++;
        counter.textContent = `Кликов: ${count}`;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    if (!input || !display) return;

    input.addEventListener('input', () => {
        display.textContent = `Вы ввели: ${input.value}`;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        console.log(`Нажата клавиша: key="${e.key}", code="${e.code}", ctrl=${e.ctrlKey}, alt=${e.altKey}, shift=${e.shiftKey}`);
    });
}

// ==========================================
// ЗАДАНИЕ 5: Динамические списки
// ==========================================

function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    if (!input || !list || !input.value.trim()) return;

    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = input.value.trim();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = '';
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    if (list) list.innerHTML = '';
}

function setupListEvents() {
    const addBtn = document.getElementById('add-item');
    const clearBtn = document.getElementById('clear-list');

    if (addBtn) addBtn.addEventListener('click', addListItem);
    if (clearBtn) clearBtn.addEventListener('click', clearList);
}

// ==========================================
// ЗАДАНИЕ 6: Работа с формами
// ==========================================

function validateForm(formData) {
    const errors = {};

    const name = formData.get('name');
    if (!name || name.trim().length < 2) {
        errors.name = 'Имя должно быть не менее 2 символов';
    }

    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.email = 'Введите корректный email';
    }

    const age = formData.get('age');
    if (age) {
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            errors.age = 'Возраст должен быть от 1 до 120';
        }
    }

    return errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';
    output.className = 'error-message';

    Object.values(errors).forEach(error => {
        const p = document.createElement('p');
        p.textContent = error;
        output.appendChild(p);
    });
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = `
        <h4>✅ Форма успешно отправлена!</h4>
        <p><strong>Имя:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Возраст:</strong> ${userData.age || 'не указан'}</p>
    `;
    output.className = 'success-message';
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(data);
        form.reset();
    }
}

function setupForm() {
    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================

function initializeApp() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();

    createCard('Пример карточки', 'Это содержимое карточки');
    createList(['Первый элемент', 'Второй элемент', 'Третий элемент']);

    console.log('Приложение инициализировано!');
}

document.addEventListener('DOMContentLoaded', initializeApp);
