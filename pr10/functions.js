// ==========================================
// ОСНОВНЫЕ ЗАДАНИЯ
// ==========================================

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

// Деструктуризация с параметрами по умолчанию
function createUser({ name, age, email = 'не указан' }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// Замыкание
function secretMessage(password, message) {
    return function(inputPassword) {
        if (inputPassword === password) {
            return message;
        }
        return 'Доступ запрещен';
    };
}

// ==========================================
// РЕКУРСИЯ И ФУНКЦИИ ВЫСШЕГО ПОРЯДКА
// ==========================================

function compose(...functions) {
    return function(initialValue) {
        return functions.reduceRight((acc, fn) => fn(acc), initialValue);
    };
}

function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

function myReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (initialValue === undefined) {
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

// ==========================================
// СЛОЖНО, НО ВАЖНО
// ==========================================

// Каррирование
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
}

// Мемоизация
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Дебаунсинг
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Throttle
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Генераторы
function* generateFibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}
