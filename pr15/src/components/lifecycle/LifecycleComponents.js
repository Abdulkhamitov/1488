import React, { Component } from 'react';
import './LifecycleComponents.css';

// ЗАДАНИЕ 5: Методы жизненного цикла

class Timer extends Component {
  state = { seconds: 0, isRunning: false };

  componentDidMount() {
    console.log('Timer: componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.interval = setInterval(() => {
          this.setState(s => ({ seconds: s.seconds + 1 }));
        }, 1000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    console.log('Timer: componentWillUnmount');
    clearInterval(this.interval);
  }

  toggle = () => this.setState(s => ({ isRunning: !s.isRunning }));
  reset = () => this.setState({ seconds: 0, isRunning: false });

  render() {
    return (
      <div className="timer-box">
        <h4>Таймер</h4>
        <div className="timer-display">{this.state.seconds} сек.</div>
        <button onClick={this.toggle}>{this.state.isRunning ? 'Стоп' : 'Старт'}</button>
        <button onClick={this.reset}>Сброс</button>
      </div>
    );
  }
}

class WindowSizeTracker extends Component {
  state = { width: window.innerWidth, height: window.innerHeight };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    return (
      <div className="window-size-box">
        <h4>Размер окна</h4>
        <p>Ширина: {this.state.width}px</p>
        <p>Высота: {this.state.height}px</p>
      </div>
    );
  }
}

class DataFetcher extends Component {
  state = { data: null, loading: true, error: null };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(this.props.url);
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    return (
      <div className="data-fetcher-box">
        <h4>Загрузка данных</h4>
        {this.state.loading && <p>Загрузка...</p>}
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        {this.state.data && Array.isArray(this.state.data) && (
          <ul className="user-list">
            {this.state.data.slice(0, 3).map(user => (
              <li key={user.id}>{user.name} — {user.email}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

class LifecycleComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Жизненный цикл компонентов</h2>
        <div className="component-demo">
          <h3>Задание 5: Методы жизненного цикла</h3>
          <div className="output">
            <Timer />
            <WindowSizeTracker />
            <DataFetcher url="https://jsonplaceholder.typicode.com/users" />
          </div>
        </div>
      </section>
    );
  }
}

export default LifecycleComponents;
