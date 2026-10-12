const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// ==========================================
// ЗАДАНИЕ 1: Базовые GET запросы
// ==========================================

async function fetchGetRequest() {
    const output = document.getElementById('get-output');
    output.textContent = 'Загрузка...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        output.textContent = `Пост #${data.id}: "${data.title}"`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchJsonData() {
    const output = document.getElementById('get-output');
    const dataContainer = document.getElementById('get-data');
    output.textContent = 'Загрузка пользователей...';

    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const users = await response.json();
        output.textContent = `Загружено пользователей: ${users.length}`;

        dataContainer.innerHTML = users.map(user => `
            <div class="user-card">
                <h4>${user.name}</h4>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Телефон:</strong> ${user.phone}</p>
                <p><strong>Сайт:</strong> ${user.website}</p>
            </div>
        `).join('');
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithError() {
    const output = document.getElementById('get-output');
    output.textContent = 'Тест ошибки...';

    try {
        const response = await fetch('https://this-domain-does-not-exist-12345.com/api');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
        output.textContent = `Перехвачена ошибка: ${error.message}\nТип: ${error.name}`;
        output.className = 'output error';
    }
}

function setupGetRequests() {
    document.getElementById('fetch-get')?.addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json')?.addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error')?.addEventListener('click', fetchWithError);
}

// ==========================================
// ЗАДАНИЕ 2: POST, PUT, PATCH, DELETE
// ==========================================

async function fetchPostRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = 'POST запрос...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержимое нового поста',
                userId: 1
            })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        output.innerHTML = `<strong>POST создан:</strong><br><pre>${JSON.stringify(data, null, 2)}</pre>`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchPutRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = 'PUT запрос...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 1,
                title: 'Обновлённый заголовок',
                body: 'Обновлённое содержимое',
                userId: 1
            })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        output.innerHTML = `<strong>PUT обновлён:</strong><br><pre>${JSON.stringify(data, null, 2)}</pre>`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchPatchRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = 'PATCH запрос...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Только заголовок изменён' })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        output.innerHTML = `<strong>PATCH (частичное обновление):</strong><br><pre>${JSON.stringify(data, null, 2)}</pre>`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchDeleteRequest() {
    const output = document.getElementById('crud-output');
    output.textContent = 'DELETE запрос...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'DELETE'
        });

        if (response.ok) {
            output.textContent = `✅ Пост успешно удалён (статус: ${response.status})`;
            output.className = 'output success';
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

function setupCrudRequests() {
    document.getElementById('fetch-post')?.addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put')?.addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch')?.addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete')?.addEventListener('click', fetchDeleteRequest);
}

// ==========================================
// ЗАДАНИЕ 3: Заголовки и параметры
// ==========================================

async function fetchWithHeaders() {
    const output = document.getElementById('headers-output');
    output.textContent = 'Запрос с кастомными заголовками...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: {
                'X-Custom-Header': 'MyCustomValue',
                'Authorization': 'Bearer test-token-12345'
            }
        });

        const data = await response.json();
        output.innerHTML = `Отправлены заголовки:<br>
            X-Custom-Header: MyCustomValue<br>
            Authorization: Bearer test-token-12345<br><br>
            Получено постов: ${data.length}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithAuth() {
    const output = document.getElementById('headers-output');
    output.textContent = 'Авторизация...';

    // Basic Auth
    const credentials = btoa('username:password');
    output.innerHTML = `Basic Auth заголовок: Basic ${credentials}<br>
        Bearer Token: Bearer eyJhbGciOiJIUzI1NiIs...<br><br>
        (эмуляция, реальный запрос к API не выполняется)`;
    output.className = 'output success';
}

async function fetchWithParams() {
    const output = document.getElementById('headers-output');
    output.textContent = 'Запрос с параметрами...';

    try {
        const params = new URLSearchParams({
            _limit: 5,
            _sort: 'id',
            _order: 'desc'
        });

        const response = await fetch(`${API_BASE_URL}/posts?${params}`);
        const data = await response.json();

        output.innerHTML = `URL: ${API_BASE_URL}/posts?${params}<br>
            Получено постов: ${data.length}<br>
            ID постов: ${data.map(p => p.id).join(', ')}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithTimeout() {
    const output = document.getElementById('headers-output');
    output.textContent = 'Запрос с таймаутом 3 секунды...';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        output.textContent = `Успешно загружено постов: ${data.length} (в пределах таймаута)`;
        output.className = 'output success';
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            output.textContent = 'Запрос отменён по таймауту';
        } else {
            output.textContent = `Ошибка: ${error.message}`;
        }
        output.className = 'output error';
    }
}

function setupHeadersAndParams() {
    document.getElementById('fetch-headers')?.addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-auth')?.addEventListener('click', fetchWithAuth);
    document.getElementById('fetch-params')?.addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout')?.addEventListener('click', fetchWithTimeout);
}

// ==========================================
// ЗАДАНИЕ 4: Обработка ответов
// ==========================================

async function fetchAndCheckStatus() {
    const output = document.getElementById('response-output');
    output.textContent = 'Проверка статуса...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        output.innerHTML = `Статус: ${response.status}<br>
            OK: ${response.ok}<br>
            StatusText: ${response.statusText}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchAndReadHeaders() {
    const output = document.getElementById('response-output');
    output.textContent = 'Чтение заголовков ответа...';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        const headers = [];
        response.headers.forEach((value, key) => {
            headers.push(`<li><strong>${key}:</strong> ${value}</li>`);
        });

        output.innerHTML = `<strong>Заголовки ответа:</strong>
            <ul class="header-list">${headers.join('')}</ul>`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchBlobData() {
    const output = document.getElementById('response-output');
    const dataContainer = document.getElementById('response-data');
    output.textContent = 'Загрузка Blob...';

    try {
        const response = await fetch('https://picsum.photos/200/300');
        const blob = await response.blob();

        const imgUrl = URL.createObjectURL(blob);
        dataContainer.innerHTML = `<img src="${imgUrl}" alt="Blob изображение" style="max-width:200px">`;

        output.textContent = `Blob загружен: тип=${blob.type}, размер=${blob.size} байт`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithFormData() {
    const output = document.getElementById('response-output');
    output.textContent = 'Отправка FormData...';

    try {
        const formData = new FormData();
        formData.append('name', 'Иван');
        formData.append('email', 'ivan@example.com');
        formData.append('file', new Blob(['test content'], { type: 'text/plain' }), 'test.txt');

        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        output.innerHTML = `FormData отправлена:<br>
            name: Иван<br>
            email: ivan@example.com<br>
            Ответ сервера: ${JSON.stringify(data, null, 2)}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

function setupResponseHandling() {
    document.getElementById('fetch-status')?.addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-headers-response')?.addEventListener('click', fetchAndReadHeaders);
    document.getElementById('fetch-blob')?.addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata')?.addEventListener('click', fetchWithFormData);
}

// ==========================================
// ЗАДАНИЕ 5: Обработка ошибок
// ==========================================

async function fetchNetworkError() {
    const output = document.getElementById('error-output');
    output.textContent = 'Тест сетевой ошибки...';

    try {
        await fetch('https://this-domain-really-does-not-exist-98765.com/api');
    } catch (error) {
        output.textContent = `Сетевая ошибка: ${error.message}\nТип: ${error.name}`;
        output.className = 'output error';
    }
}

async function fetchHttpError() {
    const output = document.getElementById('error-output');
    output.textContent = 'Тест HTTP ошибки (404)...';

    try {
        const response = await fetch(`${API_BASE_URL}/nonexistent-endpoint-xyz`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        output.textContent = `HTTP ошибка перехвачена: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithAbort() {
    const output = document.getElementById('error-output');
    output.textContent = 'Запрос будет отменён через 100мс...';

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 100);

    try {
        await fetch(`${API_BASE_URL}/posts`, { signal: controller.signal });
        output.textContent = 'Запрос завершён (не должен успеть)';
    } catch (error) {
        if (error.name === 'AbortError') {
            output.textContent = 'Запрос успешно отменён через AbortController';
            output.className = 'output warning';
        } else {
            output.textContent = `Ошибка: ${error.message}`;
            output.className = 'output error';
        }
    }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 500));
        }
    }
}

async function testRetry() {
    const output = document.getElementById('error-output');
    output.textContent = 'Повторные попытки с экспоненциальной задержкой...';

    try {
        const data = await fetchWithRetry(`${API_BASE_URL}/posts/1`, {}, 3);
        output.textContent = `✅ Успешно после повторных попыток: ${data.title}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Все попытки исчерпаны: ${error.message}`;
        output.className = 'output error';
    }
}

function setupErrorHandling() {
    document.getElementById('fetch-network-error')?.addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error')?.addEventListener('click', fetchHttpError);
    document.getElementById('fetch-abort')?.addEventListener('click', fetchWithAbort);
    document.getElementById('fetch-retry')?.addEventListener('click', testRetry);
}

// ==========================================
// ЗАДАНИЕ 6: Параллельные запросы
// ==========================================

async function fetchWithPromiseAll() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Promise.all - 3 параллельных запроса...';
    const startTime = Date.now();

    try {
        const [users, posts, comments] = await Promise.all([
            fetch(`${API_BASE_URL}/users`).then(r => r.json()),
            fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
            fetch(`${API_BASE_URL}/comments`).then(r => r.json())
        ]);

        const elapsed = Date.now() - startTime;
        output.innerHTML = `Promise.all завершён за ${elapsed}мс<br>
            Users: ${users.length}<br>
            Posts: ${posts.length}<br>
            Comments: ${comments.length}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithPromiseRace() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Promise.race - кто быстрее...';

    try {
        const result = await Promise.race([
            fetch(`${API_BASE_URL}/posts/1`).then(r => r.json()).then(d => `Post: ${d.title.substring(0, 30)}...`),
            fetch(`${API_BASE_URL}/users/1`).then(r => r.json()).then(d => `User: ${d.name}`),
            new Promise(resolve => setTimeout(() => resolve('Таймаут 500мс'), 500))
        ]);

        output.textContent = `Promise.race победитель: ${result}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchSequentialRequests() {
    const output = document.getElementById('parallel-output');
    output.textContent = 'Последовательные запросы...';
    const startTime = Date.now();

    try {
        const user = await fetch(`${API_BASE_URL}/users/1`).then(r => r.json());
        const posts = await fetch(`${API_BASE_URL}/posts?userId=${user.id}`).then(r => r.json());
        const comments = await fetch(`${API_BASE_URL}/posts/${posts[0].id}/comments`).then(r => r.json());

        const elapsed = Date.now() - startTime;
        output.innerHTML = `Последовательные запросы за ${elapsed}мс<br>
            User: ${user.name}<br>
            Posts: ${posts.length}<br>
            Comments: ${comments.length}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

function setupParallelRequests() {
    document.getElementById('promise-all')?.addEventListener('click', fetchWithPromiseAll);
    document.getElementById('promise-race')?.addEventListener('click', fetchWithPromiseRace);
    document.getElementById('sequential-requests')?.addEventListener('click', fetchSequentialRequests);
}

// ==========================================
// ЗАДАНИЕ 7: Реальные сценарии
// ==========================================

async function fetchUserWithPosts() {
    const output = document.getElementById('scenario-output');
    output.textContent = 'Загрузка пользователя и его постов...';

    try {
        const user = await fetch(`${API_BASE_URL}/users/1`).then(r => r.json());
        const posts = await fetch(`${API_BASE_URL}/posts?userId=${user.id}`).then(r => r.json());

        output.innerHTML = `<strong>Пользователь:</strong> ${user.name}<br>
            <strong>Email:</strong> ${user.email}<br>
            <strong>Постов:</strong> ${posts.length}<br><br>
            <strong>Последние посты:</strong><br>
            ${posts.slice(0, 3).map(p => `• ${p.title}`).join('<br>')}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function fetchWithSearch() {
    const output = document.getElementById('scenario-output');
    output.textContent = 'Поиск постов по слову "qui"...';

    try {
        const allPosts = await fetch(`${API_BASE_URL}/posts`).then(r => r.json());
        const searchTerm = 'qui';
        const results = allPosts.filter(p =>
            p.title.toLowerCase().includes(searchTerm) ||
            p.body.toLowerCase().includes(searchTerm)
        );

        output.innerHTML = `Поиск "${searchTerm}": найдено ${results.length} постов<br><br>
            ${results.slice(0, 5).map(p => `• ${p.title}`).join('<br>')}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

function createFetchCache() {
    const cache = new Map();
    const TTL = 10000;

    return async function cachedFetch(url, options = {}) {
        const cacheKey = url + JSON.stringify(options);
        const now = Date.now();

        if (cache.has(cacheKey)) {
            const { data, timestamp } = cache.get(cacheKey);
            if (now - timestamp < TTL) {
                console.log('Из кэша:', url);
                return data;
            }
            cache.delete(cacheKey);
        }

        console.log('Запрос:', url);
        const response = await fetch(url, options);
        const data = await response.json();
        cache.set(cacheKey, { data, timestamp: now });
        return data;
    };
}

async function testCacheFetch() {
    const output = document.getElementById('scenario-output');
    const cachedFetch = createFetchCache();
    const url = `${API_BASE_URL}/posts/1`;

    output.textContent = 'Первый запрос...';
    const start1 = Date.now();
    const data1 = await cachedFetch(url);
    const time1 = Date.now() - start1;

    output.textContent += `\nВремя: ${time1}мс`;

    output.textContent += '\n\nВторой запрос (из кэша)...';
    const start2 = Date.now();
    const data2 = await cachedFetch(url);
    const time2 = Date.now() - start2;

    output.textContent += `\nВремя: ${time2}мс (должно быть ~0мс)`;
    output.textContent += `\nДанные совпадают: ${JSON.stringify(data1) === JSON.stringify(data2)}`;
    output.className = 'output success';
}

function setupRealScenarios() {
    document.getElementById('user-with-posts')?.addEventListener('click', fetchUserWithPosts);
    document.getElementById('search-posts')?.addEventListener('click', fetchWithSearch);
    document.getElementById('cache-fetch')?.addEventListener('click', testCacheFetch);
}

// ==========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================

function displayOutput(elementId, data, isError = false) {
    const output = document.getElementById(elementId);
    if (!output) return;

    const timestamp = new Date().toLocaleTimeString();
    let content;

    if (typeof data === 'object') {
        content = JSON.stringify(data, null, 2);
    } else if (data instanceof Error) {
        content = `Ошибка: ${data.message}\n${data.stack}`;
    } else {
        content = String(data);
    }

    output.innerHTML = `[${timestamp}] ${content}`;
    output.className = `output ${isError ? 'error' : 'success'}`;
}

function displayData(elementId, data) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (Array.isArray(data)) {
        container.innerHTML = data.map(item => `
            <div class="user-card">
                <h4>${item.name || item.title || 'Без названия'}</h4>
                <p>Email: ${item.email || 'Нет'}</p>
                <p>Телефон: ${item.phone || 'Нет'}</p>
                <p>${item.body || item.description || ''}</p>
            </div>
        `).join('');
    } else if (typeof data === 'object') {
        container.innerHTML = `<div class="json-view">${JSON.stringify(data, null, 2)}</div>`;
    } else {
        container.innerHTML = `<p>${String(data)}</p>`;
    }
}

function setLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Загрузка...';
    } else {
        button.disabled = false;
        const originalText = button.getAttribute('data-original-text') || button.textContent;
        button.innerHTML = originalText;
    }
}

function buildUrl(baseUrl, params = {}) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
}

async function measureExecutionTime(asyncFunction) {
    const startTime = Date.now();
    const result = await asyncFunction();
    const endTime = Date.now();
    return { result, executionTime: endTime - startTime };
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================

function initializeFetchAPI() {
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
    setupErrorHandling();
    setupParallelRequests();
    setupRealScenarios();

    document.querySelectorAll('button').forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
    });

    console.log('Все обработчики Fetch API инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeFetchAPI);
