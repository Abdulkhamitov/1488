import React, { useState } from 'react';
import './BasicComponents.css';

// ЗАДАНИЕ 1: Функциональные компоненты с props

function WelcomeMessage({ name, age }) {
  return (
    <div className="welcome-message">
      <h3>Привет, {name}!</h3>
      <p>Тебе {age} лет.</p>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <span className={user.isOnline ? 'online' : 'offline'}>
          {user.isOnline ? '● Онлайн' : '○ Оффлайн'}
        </span>
      </div>
    </div>
  );
}

function Button({ variant = 'primary', size = 'medium', onClick, children }) {
  return (
    <button className={`custom-button ${variant} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ЗАДАНИЕ 2: Children и условный рендеринг

function Card({ title, children }) {
  return (
    <div className="custom-card">
      {title && <h4>{title}</h4>}
      <div>{children}</div>
    </div>
  );
}

function Toggle({ buttonText = 'Показать/скрыть', children }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>{buttonText}</button>
      {isVisible && <div style={{ marginTop: '10px' }}>{children}</div>}
    </div>
  );
}

function ConditionalMessage({ status }) {
  const messages = {
    success: { text: '✅ Операция выполнена успешно!', color: '#27ae60' },
    error: { text: '❌ Произошла ошибка!', color: '#e74c3c' },
    warning: { text: '⚠️ Внимание!', color: '#f39c12' }
  };
  const msg = messages[status] || { text: 'Неизвестный статус', color: '#333' };
  return <p style={{ color: msg.color, fontWeight: 'bold' }}>{msg.text}</p>;
}

function BasicComponents() {
  const userData = {
    name: 'Анна Иванова',
    email: 'anna@example.com',
    avatar: 'https://i.pravatar.cc/100',
    isOnline: true
  };

  return (
    <section className="task-section">
      <h2>Базовые компоненты</h2>

      <div className="component-demo">
        <h3>Задание 1: Компоненты с props</h3>
        <div className="output">
          <WelcomeMessage name="Иван" age={25} />
          <UserCard user={userData} />
          <Button variant="primary" onClick={() => alert('Клик!')}>
            Нажми меня
          </Button>
          <Button variant="secondary" size="small">
            Маленькая кнопка
          </Button>
        </div>
      </div>

      <div className="component-demo">
        <h3>Задание 2: Children и условный рендеринг</h3>
        <div className="output">
          <Card title="Пример карточки">
            <p>Это содержимое карточки</p>
          </Card>
          <Toggle buttonText="Показать/скрыть">
            <p>Секретный контент!</p>
          </Toggle>
          <ConditionalMessage status="success" />
          <ConditionalMessage status="error" />
          <ConditionalMessage status="warning" />
        </div>
      </div>
    </section>
  );
}

export default BasicComponents;
