import React from 'react';

function ComponentTests() {
  const runTests = () => {
    const results = [];
    try {
      const basic = document.querySelectorAll('#basic-output-1 > *');
      const stateful = document.querySelectorAll('#stateful-output-1 > *');
      const hooks = document.querySelectorAll('#hooks-output-1 > *');
      results.push({ name: 'Базовые компоненты', passed: basic.length > 0, message: `Найдено: ${basic.length}` });
      results.push({ name: 'Компоненты с состоянием', passed: stateful.length > 0, message: `Найдено: ${stateful.length}` });
      results.push({ name: 'Hooks компоненты', passed: hooks.length > 0, message: `Найдено: ${hooks.length}` });
    } catch (e) {
      results.push({ name: 'Ошибка', passed: false, message: e.message });
    }
    console.log('=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ ===');
    results.forEach(r => console.log(`${r.passed ? '✅' : '❌'} ${r.name}: ${r.message}`));
    const passed = results.filter(r => r.passed).length;
    alert(`Тестирование завершено: ${passed}/${results.length} тестов пройдено`);
  };

  return (
    <section className="task-section">
      <h2>Тестирование</h2>
      <button onClick={runTests} style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
        Запустить тесты компонентов
      </button>
    </section>
  );
}

export default ComponentTests;
