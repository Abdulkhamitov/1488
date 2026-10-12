function runEventTest(testName, condition) {
    console.log(`${testName}:`, condition ? '✅' : '❌');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('=== ЗАПУСК ТЕСТОВ СОБЫТИЙ ===');

        // Проверка наличия элементов
        runEventTest('Кнопка basic-btn существует', !!document.getElementById('basic-btn'));
        runEventTest('Элемент color-box существует', !!document.getElementById('color-box'));
        runEventTest('Список item-list существует', !!document.getElementById('item-list'));

        // Проверка обработчиков (косвенно)
        const basicBtn = document.getElementById('basic-btn');
        if (basicBtn) {
            const event = new MouseEvent('click', { bubbles: true });
            basicBtn.dispatchEvent(event);
            const output = document.getElementById('basic-output');
            runEventTest('Обработчик клика сработал', output && output.textContent.includes('Тип события'));
        }

        console.log('=== ТЕСТИРОВАНИЕ СОБЫТИЙ ЗАВЕРШЕНО ===');
    }, 200);
});
