import React, { Component } from 'react';
import './StatefulComponents.css';

// ЗАДАНИЕ 3: Классовые компоненты с состоянием

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialValue || 0 };
  }
  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });
  reset = () => this.setState({ count: 0 });

  render() {
    return (
      <div className="counter-box">
        <h4>Счетчик</h4>
        <div className="counter-value">{this.state.count}</div>
        <div className="counter-buttons">
          <button onClick={this.decrement}>-</button>
          <button onClick={this.reset}>Сброс</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  state = { email: '', password: '', errors: {} };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!this.state.email.includes('@')) errors.email = 'Некорректный email';
    if (this.state.password.length < 6) errors.password = 'Минимум 6 символов';
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      alert(`Успешный вход: ${this.state.email}`);
    }
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h4>Вход</h4>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        {this.state.errors.email && <div className="form-error">{this.state.errors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={this.state.password}
          onChange={this.handleChange}
        />
        {this.state.errors.password && <div className="form-error">{this.state.errors.password}</div>}
        <button type="submit">Войти</button>
      </form>
    );
  }
}

class ColorPicker extends Component {
  state = { selected: this.props.colors[0] };

  render() {
    return (
      <div>
        <div className="color-picker">
          {this.props.colors.map((color) => (
            <div
              key={color}
              className={`color-swatch ${this.state.selected === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => this.setState({ selected: color })}
            />
          ))}
        </div>
        <div className="color-preview" style={{ backgroundColor: this.state.selected }} />
        <p>Выбран цвет: {this.state.selected}</p>
      </div>
    );
  }
}

// ЗАДАНИЕ 4: Обработка событий и формы

class TodoList extends Component {
  state = { todos: [], input: '' };

  addTodo = () => {
    if (!this.state.input.trim()) return;
    this.setState({
      todos: [...this.state.todos, { id: Date.now(), text: this.state.input, done: false }],
      input: ''
    });
  };

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
    });
  };

  removeTodo = (id) => {
    this.setState({ todos: this.state.todos.filter(t => t.id !== id) });
  };

  render() {
    return (
      <div className="todo-list">
        <h4>Список задач</h4>
        <input
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
          placeholder="Новая задача"
        />
        <button onClick={this.addTodo}>Добавить</button>
        {this.state.todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.done ? 'completed' : ''}`}>
            <span onClick={() => this.toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => this.removeTodo(todo.id)}>✕</button>
          </div>
        ))}
      </div>
    );
  }
}

class SearchBox extends Component {
  state = { query: '' };

  render() {
    const filtered = this.props.items.filter(item =>
      item.toLowerCase().includes(this.state.query.toLowerCase())
    );
    return (
      <div className="search-box">
        <input
          value={this.state.query}
          onChange={(e) => this.setState({ query: e.target.value })}
          placeholder="Поиск..."
        />
        <button onClick={() => this.setState({ query: '' })}>Очистить</button>
        <div className="search-results">
          {filtered.length > 0 ? (
            <ul>{filtered.map((item, i) => <li key={i}>{item}</li>)}</ul>
          ) : (
            <p>Ничего не найдено</p>
          )}
        </div>
      </div>
    );
  }
}

class StatefulComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Компоненты с состоянием</h2>

        <div className="component-demo">
          <h3>Задание 3: Классовые компоненты</h3>
          <div className="output">
            <Counter initialValue={0} />
            <LoginForm />
            <ColorPicker colors={['#ff0000', '#00ff00', '#0000ff']} />
          </div>
        </div>

        <div className="component-demo">
          <h3>Задание 4: Обработка событий</h3>
          <div className="output">
            <TodoList />
            <SearchBox items={['React', 'JavaScript', 'HTML', 'CSS']} />
          </div>
        </div>
      </section>
    );
  }
}

export default StatefulComponents;
