import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';

// ЗАДАНИЕ 6: Хуки useState и useEffect

function CounterWithHooks() {
  const [count, setCount] = useState(0);
  return (
    <div className="hook-box">
      <h4>Счетчик с хуками</h4>
      <div className="hook-counter">{count}</div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Сброс</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

function UserProfile() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="hook-box">
      <h4>Профиль пользователя</h4>
      <input name="name" value={profile.name} onChange={handleChange} placeholder="Имя" />
      <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
      <button onClick={handleSave}>Сохранить</button>
      {saved && <p style={{ color: 'green' }}>✓ Сохранено!</p>}
      <p>Имя: {profile.name}, Email: {profile.email}</p>
    </div>
  );
}

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(prev => [...prev, `Эффект сработал (count=${count})`]);
  }, [count]);

  return (
    <div className="hook-box">
      <h4>useEffect Demo</h4>
      <button onClick={() => setCount(count + 1)}>Увеличить ({count})</button>
      <ul>{logs.slice(-3).map((log, i) => <li key={i}>{log}</li>)}</ul>
    </div>
  );
}

// ЗАДАНИЕ 7: Кастомные хуки и useContext

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(r => r.json())
      .then(data => { if (!cancelled) { setData(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`theme-${theme}`} style={{ marginTop: '1rem' }}>
      <h4>Тема: {theme}</h4>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}

function HooksComponents() {
  const [name, setName] = useLocalStorage('demo_name', '');
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  return (
    <section className="task-section">
      <h2>React Hooks</h2>

      <div className="component-demo">
        <h3>Задание 6: useState и useEffect</h3>
        <div className="output">
          <CounterWithHooks />
          <UserProfile />
          <EffectDemo />
        </div>
      </div>

      <div className="component-demo">
        <h3>Задание 7: Кастомные хуки и Context</h3>
        <div className="output">
          <div className="hook-box">
            <h4>useLocalStorage</h4>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
            <p>Сохранено: {name}</p>
          </div>

          <div className="hook-box">
            <h4>useFetch</h4>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <ul>{data.slice(0, 3).map(u => <li key={u.id}>{u.name}</li>)}</ul>}
          </div>

          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
}

export default HooksComponents;
