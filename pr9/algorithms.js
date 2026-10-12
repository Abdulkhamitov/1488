// ==========================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С ЧИСЛАМИ
// ==========================================

// Временная сложность: O(√n)
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

// Временная сложность: O(n)
function factorial(n) {
    if (n < 0) return -1;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Временная сложность: O(n)
function fibonacci(n) {
    const result = [];
    if (n <= 0) return result;
    if (n >= 1) result.push(0);
    if (n >= 2) result.push(1);
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

// Временная сложность: O(log(min(a, b)))
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

// ==========================================
// ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРОКАМИ
// ==========================================

// Временная сложность: O(n)
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-zа-яё]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Временная сложность: O(n)
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    const lowerStr = str.toLowerCase();
    let count = 0;
    for (let char of lowerStr) {
        if (vowels.includes(char)) count++;
    }
    return count;
}

// Временная сложность: O(n)
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Временная сложность: O(n)
function findLongestWord(sentence) {
    const words = sentence.split(/\s+/);
    let longest = '';
    for (let word of words) {
        const cleaned = word.replace(/[^a-zа-яё]/gi, '');
        if (cleaned.length > longest.length) {
            longest = cleaned;
        }
    }
    return longest;
}

// ==========================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С МАССИВАМИ
// ==========================================

// Временная сложность: O(n)
function findMax(arr) {
    if (arr.length === 0) return undefined;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Временная сложность: O(n)
function removeDuplicates(arr) {
    const seen = new Set();
    const result = [];
    for (let item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }
    return result;
}

// Временная сложность: O(n²)
function bubbleSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

// Временная сложность: O(log n)
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// ==========================================
// УТИЛИТАРНЫЕ ФУНКЦИИ
// ==========================================

// Временная сложность: O(1)
function formatCurrency(amount, currency = '₽') {
    const parts = amount.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.') + ' ' + currency;
}

// Временная сложность: O(1)
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Временная сложность: O(n)
function generatePassword(length = 8) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = lowercase + uppercase + digits + special;

    let password = '';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = password.length; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
}
