// ==========================================
// ЗАДАНИЕ 1: Основы промисов
// ==========================================

function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve('Успех!');
            } else {
                reject(new Error('Ошибка!'));
            }
        }, 1000);
    });
}

function handleBasicPromise() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Ожидание...';

    createBasicPromise(true)
        .then(result => {
            output.textContent = `Результат: ${result}`;
        })
        .catch(error => {
            output.textContent = `Ошибка: ${error.message}`;
        });
}

function createPromiseChain() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Запуск цепочки...';

    createBasicPromise(true)
        .then(result => {
            output.textContent = `Шаг 1: ${result}`;
            return new Promise(resolve => setTimeout(() => resolve('Шаг 2 завершён'), 500));
        })
        .then(result => {
            output.textContent += `\n${result}`;
            return new Promise(resolve => setTimeout(() => resolve('Шаг 3 завершён'), 500));
        })
        .then(result => {
            output.textContent += `\n${result}`;
            output.textContent += '\n✅ Цепочка завершена!';
        })
        .catch(error => {
            output.textContent = `Ошибка в цепочке: ${error.message}`;
        });
}

function handlePromiseError() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Ожидание ошибки...';

    createBasicPromise(false)
        .then(result => {
            output.textContent = `Результат: ${result}`;
        })
        .catch(error => {
            output.textContent = `Перехвачена ошибка: ${error.message}`;
        });
}

function setupPromiseEvents() {
    document.getElementById('basic-promise')?.addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain')?.addEventListener('click', createPromiseChain);
    document.getElementById('promise-error')?.addEventListener('click', handlePromiseError);
}

// ==========================================
// ЗАДАНИЕ 2: Async/Await
// ==========================================

async function basicAsyncAwait() {
    const output = document.getElementById('async-output');
    output.textContent = 'Ожидание...';

    try {
        const result = await createBasicPromise(true);
        output.textContent = `Результат async/await: ${result}`;
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
    }
}

async function handleAsyncError() {
    const output = document.getElementById('async-output');
    output.textContent = 'Ожидание ошибки...';

    try {
        const result = await createBasicPromise(false);
        output.textContent = `Результат: ${result}`;
    } catch (error) {
        output.textContent = `Перехвачена ошибка async: ${error.message}`;
    }
}

async function parallelAsyncExecution() {
    const output = document.getElementById('async-output');
    output.textContent = 'Параллельное выполнение...';
    const startTime = Date.now();

    try {
        const results = await Promise.all([
            new Promise(resolve => setTimeout(() => resolve('Задача 1'), 500)),
            new Promise(resolve => setTimeout(() => resolve('Задача 2'), 700)),
            new Promise(resolve => setTimeout(() => resolve('Задача 3'), 300))
        ]);

        const elapsed = Date.now() - startTime;
        output.textContent = `Результаты: ${results.join(', ')}\nВремя: ${elapsed}мс (параллельно)`;
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
    }
}

function setupAsyncEvents() {
    document.getElementById('basic-async')?.addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error')?.addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel')?.addEventListener('click', parallelAsyncExecution);
}

// ==========================================
// ЗАДАНИЕ 3: Работа с внешними API
// ==========================================

async function fetchUsers() {
    const output = document.getElementById('api-output');
    const dataContainer = document.getElementById('api-data');
    output.textContent = 'Загрузка пользователей...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const users = await response.json();
        output.textContent = `Загружено пользователей: ${users.length}`;

        dataContainer.innerHTML = users.map(user => `
            <div class="user-card">
                <h4>${user.name}</h4>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Телефон:</strong> ${user.phone}</p>
                <p><strong>Город:</strong> ${user.address.city}</p>
            </div>
        `).join('');
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function createPost() {
    const output = document.getElementById('api-output');
    output.textContent = 'Отправка POST запроса...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержимое поста',
                userId: 1
            })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        output.textContent = `Пост создан с ID: ${data.id}\n${JSON.stringify(data, null, 2)}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function testApiError() {
    const output = document.getElementById('api-output');
    output.textContent = 'Тест ошибки API...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent-endpoint-12345');
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        output.textContent = `Перехвачена ошибка: ${error.message}\nТип: ${error.name}`;
        output.className = 'output error';
    }
}

function setupApiEvents() {
    document.getElementById('fetch-users')?.addEventListener('click', fetchUsers);
    document.getElementById('fetch-post')?.addEventListener('click', createPost);
    document.getElementById('fetch-error')?.addEventListener('click', testApiError);
}

// ==========================================
// ЗАДАНИЕ 4: Асинхронные таймеры
// ==========================================

let intervalId = null;
let intervalCounter = 0;

function startAsyncInterval() {
    if (intervalId) return;

    const output = document.getElementById('interval-output');
    intervalCounter = 0;

    intervalId = setInterval(async () => {
        intervalCounter++;
        output.textContent = `Интервал: ${intervalCounter}`;

        // Имитация асинхронной операции
        await new Promise(resolve => setTimeout(resolve, 100));
    }, 1000);
}

function stopAsyncInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    intervalCounter = 0;
    const output = document.getElementById('interval-output');
    if (output) output.textContent = 'Интервал: 0';
}

function delayWithPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDelay() {
    const output = document.getElementById('timer-output');
    output.textContent = 'Начало задержек...';

    for (let i = 1; i <= 5; i++) {
        await delayWithPromise(500);
        output.textContent += `\nШаг ${i} выполнен (${i * 500}мс)`;
    }
    output.textContent += '\n✅ Все задержки завершены!';
}

function setupTimerEvents() {
    document.getElementById('start-interval')?.addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval')?.addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise')?.addEventListener('click', testDelay);
}

// ==========================================
// ЗАДАНИЕ 5: Обработка ошибок
// ==========================================

async function asyncTryCatch() {
    const output = document.getElementById('error-output');
    output.textContent = 'Демонстрация try/catch...';

    try {
        await new Promise((_, reject) => setTimeout(() => reject(new Error('Внутренняя ошибка')), 500));
    } catch (innerError) {
        output.textContent = `Внутренняя ошибка: ${innerError.message}`;
        try {
            await new Promise((_, reject) => setTimeout(() => reject(new Error('Внешняя ошибка')), 500));
        } catch (outerError) {
            output.textContent += `\nВнешняя ошибка: ${outerError.message}`;
        }
    }
    output.textContent += '\n✅ Все ошибки обработаны';
}

async function handleMultipleErrors() {
    const output = document.getElementById('error-output');
    output.textContent = 'Запуск множественных операций...';

    const results = await Promise.allSettled([
        Promise.resolve('Успех 1'),
        Promise.reject(new Error('Ошибка 1')),
        Promise.resolve('Успех 2'),
        Promise.reject(new Error('Ошибка 2'))
    ]);

    const fulfilled = results.filter(r => r.status === 'fulfilled').length;
    const rejected = results.filter(r => r.status === 'rejected').length;

    output.textContent = `Всего операций: ${results.length}\nУспешных: ${fulfilled}\nОшибок: ${rejected}`;
}

async function retryWithBackoff(operation, maxRetries = 3) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            const delay = Math.pow(2, i) * 100;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw lastError;
}

async function testRetry() {
    const output = document.getElementById('error-output');
    let attempt = 0;

    try {
        const result = await retryWithBackoff(async () => {
            attempt++;
            if (attempt < 3) {
                throw new Error(`Попытка ${attempt} не удалась`);
            }
            return `Успех с попытки ${attempt}`;
        }, 5);
        output.textContent = result;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Все попытки исчерпаны: ${error.message}`;
        output.className = 'output error';
    }
}

function setupErrorEvents() {
    document.getElementById('try-catch')?.addEventListener('click', asyncTryCatch);
    document.getElementById('multiple-errors')?.addEventListener('click', handleMultipleErrors);
    document.getElementById('retry-pattern')?.addEventListener('click', testRetry);
}

// ==========================================
// ЗАДАНИЕ 6: Параллельные операции
// ==========================================

async function demonstratePromiseAll() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Promise.all...';

    try {
        const [r1, r2, r3] = await Promise.all([
            new Promise(resolve => setTimeout(() => resolve('Результат 1'), 300)),
            new Promise(resolve => setTimeout(() => resolve('Результат 2'), 200)),
            new Promise(resolve => setTimeout(() => resolve('Результат 3'), 100))
        ]);

        output.textContent = `Promise.all: ${r1}, ${r2}, ${r3}`;
    } catch (error) {
        output.textContent = `Ошибка в Promise.all: ${error.message}`;
    }
}

async function demonstratePromiseRace() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Promise.race...';

    const result = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve('Быстрый (100мс)'), 100)),
        new Promise(resolve => setTimeout(() => resolve('Средний (300мс)'), 300)),
        new Promise(resolve => setTimeout(() => resolve('Медленный (500мс)'), 500))
    ]);

    output.textContent = `Promise.race победитель: ${result}`;
}

async function demonstratePromiseAllSettled() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Promise.allSettled...';

    const results = await Promise.allSettled([
        Promise.resolve('Успех 1'),
        Promise.reject(new Error('Ошибка 1')),
        Promise.resolve('Успех 2')
    ]);

    const formatted = results.map((r, i) => {
        if (r.status === 'fulfilled') {
            return `${i + 1}. ✅ ${r.value}`;
        } else {
            return `${i + 1}. ❌ ${r.reason.message}`;
        }
    }).join('\n');

    output.textContent = formatted;
}

function setupParallelEvents() {
    document.getElementById('promise-all')?.addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race')?.addEventListener('click', demonstratePromiseRace);
    document.getElementById('promise-allSettled')?.addEventListener('click', demonstratePromiseAllSettled);
}

// ==========================================
// ЗАДАНИЕ 7: Реальные сценарии
// ==========================================

async function sequentialApiRequests() {
    const output = document.getElementById('scenario-output');
    output.textContent = 'Последовательные запросы...';

    try {
        // Шаг 1: Получить пользователя
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userResponse.json();
        output.textContent = `Пользователь: ${user.name}`;

        // Шаг 2: Получить посты пользователя
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        output.textContent += `\nПостов: ${posts.length}`;

        // Шаг 3: Получить комментарии к первому посту
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}/comments`);
        const comments = await commentsResponse.json();
        output.textContent += `\nКомментариев к первому посту: ${comments.length}`;

        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function simulateFileUpload() {
    const output = document.getElementById('scenario-output');
    const progressFill = document.getElementById('progress-fill');

    output.textContent = 'Симуляция загрузки файла...';
    progressFill.style.width = '0%';

    for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        progressFill.style.width = `${i}%`;
        output.textContent = `Загрузка: ${i}%`;
    }

    output.textContent = '✅ Загрузка завершена!';
    output.className = 'output success';
}

function createRequestCache() {
    const cache = new Map();
    const TTL = 5000; // 5 секунд

    return async function cachedRequest(url) {
        const now = Date.now();
        if (cache.has(url)) {
            const { data, timestamp } = cache.get(url);
            if (now - timestamp < TTL) {
                console.log('Из кэша:', url);
                return data;
            }
            cache.delete(url);
        }

        console.log('Запрос:', url);
        const response = await fetch(url);
        const data = await response.json();
        cache.set(url, { data, timestamp: now });
        return data;
    };
}

async function testCache() {
    const output = document.getElementById('scenario-output');
    const cachedFetch = createRequestCache();
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    output.textContent = 'Первый запрос...';
    const start1 = Date.now();
    await cachedFetch(url);
    const time1 = Date.now() - start1;

    output.textContent += `\nВремя: ${time1}мс`;

    output.textContent += '\n\nВторой запрос (из кэша)...';
    const start2 = Date.now();
    await cachedFetch(url);
    const time2 = Date.now() - start2;

    output.textContent += `\nВремя: ${time2}мс (должно быть быстрее)`;
    output.className = 'output success';
}

function setupRealScenarioEvents() {
    document.getElementById('sequential-requests')?.addEventListener('click', sequentialApiRequests);
    document.getElementById('upload-simulation')?.addEventListener('click', simulateFileUpload);
    document.getElementById('cache-requests')?.addEventListener('click', testCache);
}

// ==========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================

function displayOutput(elementId, data, isError = false) {
    const output = document.getElementById(elementId);
    if (!output) return;

    const timestamp = new Date().toLocaleTimeString();
    const content = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);

    output.innerHTML = `[${timestamp}] ${content}`;
    output.className = `output ${isError ? 'error' : 'success'}`;
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================

function initializeAsyncOperations() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
    setupErrorEvents();
    setupParallelEvents();
    setupRealScenarioEvents();

    console.log('Все асинхронные обработчики инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeAsyncOperations);
