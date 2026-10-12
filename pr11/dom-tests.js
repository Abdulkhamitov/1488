function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${testName}:`, isEqual ? '✅' : '❌', { expected, actual });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('=== ЗАПУСК ТЕСТОВ DOM ===');

        // Тесты навигации
        runTest('countChildren()', countChildren(), 3);
        runTest('findSpecialChild()', findSpecialChild().trim(), 'Особый дочерний элемент');

        // Проверка созданных элементов
        const cards = document.querySelectorAll('#target1 .card');
        runTest('Количество карточек', cards.length, 1);

        const lists = document.querySelectorAll('#target1 ol');
        runTest('Количество списков', lists.length, 1);

        const listItems = document.querySelectorAll('#target1 ol li');
        runTest('Элементов в списке', listItems.length, 3);

        console.log('=== ТЕСТИРОВАНИЕ DOM ЗАВЕРШЕНО ===');
    }, 100);
});
