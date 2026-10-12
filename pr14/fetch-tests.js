document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async () => {
        console.log('=== ЗАПУСК ТЕСТОВ FETCH API ===');

        // Тест 1: GET запрос
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            console.log('GET /posts/1:', data.id === 1 ? '✅' : '❌');
        } catch (e) {
            console.log('GET /posts/1: ❌', e.message);
        }

        // Тест 2: Проверка статуса
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent');
            console.log('HTTP 404 не выбрасывает ошибку:', response.status === 404 ? '✅' : '❌');
            console.log('response.ok для 404:', response.ok === false ? '✅' : '❌');
        } catch (e) {
            console.log('Ошибка:', e.message);
        }

        // Тест 3: POST запрос
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'test', body: 'test', userId: 1 })
            });
            const data = await response.json();
            console.log('POST /posts:', data.id ? '✅' : '❌');
        } catch (e) {
            console.log('POST /posts: ❌', e.message);
        }

        console.log('=== ТЕСТИРОВАНИЕ FETCH API ЗАВЕРШЕНО ===');
    }, 100);
});
