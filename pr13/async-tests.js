async function testAsyncFunction(name, fn, expected) {
    try {
        const result = await fn();
        const passed = JSON.stringify(result) === JSON.stringify(expected);
        console.log(`${name}:`, passed ? '✅' : '❌', { expected, result });
        return passed;
    } catch (error) {
        console.log(`${name}: ❌ Ошибка - ${error.message}`);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    setTimeout(async () => {
        console.log('=== ЗАПУСК ТЕСТОВ АСИНХРОННОСТИ ===');

        // Тест createBasicPromise
        const success = await createBasicPromise(true);
        console.log('createBasicPromise(true):', success === 'Успех!' ? '✅' : '❌');

        try {
            await createBasicPromise(false);
            console.log('createBasicPromise(false): ❌ Должна быть ошибка');
        } catch (e) {
            console.log('createBasicPromise(false): ✅ Ошибка перехвачена');
        }

        // Тест delayWithPromise
        const start = Date.now();
        await delayWithPromise(500);
        const elapsed = Date.now() - start;
        console.log('delayWithPromise(500):', elapsed >= 500 ? '✅' : '❌', `${elapsed}мс`);

        // Тест Promise.all
        const results = await Promise.all([
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ]);
        console.log('Promise.all:', JSON.stringify(results) === '[1,2,3]' ? '✅' : '❌');

        // Тест Promise.allSettled
        const settled = await Promise.allSettled([
            Promise.resolve('ok'),
            Promise.reject(new Error('fail'))
        ]);
        console.log('Promise.allSettled:', settled.length === 2 ? '✅' : '❌');

        console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
    }, 100);
});
