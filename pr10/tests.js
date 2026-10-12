function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'success' : 'error'}`;
    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? '✅ УСПЕХ' : '❌ ОШИБКА'}
        <br>Ожидалось: ${JSON.stringify(expected)}
        <br>Получено: ${JSON.stringify(actual)}
    `;
    document.getElementById('testResults').appendChild(resultElement);
}

function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ПР №10 ===');

    // sum
    runTest('sum(1,2,3,4,5)', sum(1, 2, 3, 4, 5), 15);
    runTest('sum()', sum(), 0);

    // createUser
    runTest('createUser({name:"Иван", age:25})',
        createUser({ name: 'Иван', age: 25 }),
        'Пользователь: Иван, возраст: 25, email: не указан');
    runTest('createUser({name:"Мария", age:30, email:"m@mail.ru"})',
        createUser({ name: 'Мария', age: 30, email: 'm@mail.ru' }),
        'Пользователь: Мария, возраст: 30, email: m@mail.ru');

    // secretMessage
    const getSecret = secretMessage('1234', 'Секретное сообщение');
    runTest('secretMessage верный пароль', getSecret('1234'), 'Секретное сообщение');
    runTest('secretMessage неверный пароль', getSecret('wrong'), 'Доступ запрещен');

    // compose
    const addOne = x => x + 1;
    const double = x => x * 2;
    const addOneThenDouble = compose(double, addOne);
    runTest('compose(double, addOne)(5)', addOneThenDouble(5), 12);

    // myMap
    runTest('myMap([1,2,3], x=>x*2)', myMap([1, 2, 3], x => x * 2), [2, 4, 6]);
    runTest('myMap([], x=>x*2)', myMap([], x => x * 2), []);

    // myFilter
    runTest('myFilter([1,2,3,4], x=>x%2===0)',
        myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);

    // myReduce
    runTest('myReduce([1,2,3,4], (a,b)=>a+b, 0)',
        myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
    runTest('myReduce([1,2,3,4], (a,b)=>a+b)',
        myReduce([1, 2, 3, 4], (a, b) => a + b), 10);

    // curry
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    runTest('curry(add)(1)(2)(3)', curriedAdd(1)(2)(3), 6);
    runTest('curry(add)(1, 2)(3)', curriedAdd(1, 2)(3), 6);
    runTest('curry(add)(1, 2, 3)', curriedAdd(1, 2, 3), 6);

    // memoize
    let callCount = 0;
    const expensiveFn = memoize((n) => { callCount++; return n * n; });
    expensiveFn(5); expensiveFn(5); expensiveFn(5);
    runTest('memoize вызов только 1 раз', callCount, 1);

    // debounce - просто проверим, что это функция
    const debounced = debounce(() => {}, 100);
    runTest('debounce возвращает функцию', typeof debounced, 'function');

    // throttle
    const throttled = throttle(() => {}, 100);
    runTest('throttle возвращает функцию', typeof throttled, 'function');

    // generator
    const fibGen = generateFibonacci(6);
    runTest('generateFibonacci(6)', [...fibGen], [0, 1, 1, 2, 3, 5]);

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', runAllTests);
