import { useState, useEffect } from 'react';
import { fetchToday, fetchSlots } from './api';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import TimeSlots from './components/TimeSlots';
import BottomBar from './components/BottomBar';
import './styles/styles.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const [isLoadingToday, setIsLoadingToday] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [error, setError] = useState(null);

  // 1. Загрузка "сегодня"
  useEffect(() => {
    fetchToday()
      .then((data) => {
        // Сервер отдает { day, month, year }
        const today = new Date(data.year, data.month, data.day);
        setSelectedDate(today);
        setCurrentDate(today);
        setIsLoadingToday(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoadingToday(false);
      });
  }, []);

  // 2. Загрузка слотов при смене дня
  useEffect(() => {
    if (!selectedDate) return;

    setIsLoadingSlots(true);
    setError(null);

    fetchSlots(
      selectedDate.getDate(),
      selectedDate.getMonth(),
      selectedDate.getFullYear()
    )
      .then((data) => {
        const receivedSlots = data.slots || [];
        

        setSlots(receivedSlots);
        setIsLoadingSlots(false);
      })
      .catch((err) => {
        console.error(' Ошибка слотов:', err);
        setError(err.message);
        setIsLoadingSlots(false);
      });
  }, [selectedDate]);

  // Обработчики навигации и кликов
  const handlePrevMonth = () => setCurrentDate(prev => {
    const d = new Date(prev); d.setMonth(d.getMonth() - 1); return d;
  });

  const handleNextMonth = () => setCurrentDate(prev => {
    const d = new Date(prev); d.setMonth(d.getMonth() + 1); return d;
  });

  const handleDayClick = (day, month, year) => {
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => setSelectedTime(time);

  // Рендер состояний загрузки
  if (isLoadingToday) return <div className="loading-screen">Загрузка календаря...</div>;
  if (error && !selectedDate) return <div className="error-screen">{error}</div>;

  return (
    <div className="app-wrapper">
      <header className="site-header">
        <div className="brand-logo"><span className="logo-text">У ДЯДИ БИЛЛИ</span></div>
        <nav className="main-nav">
          <ul className="nav-list">
            <li><a href="#" className="nav-link">Услуги</a></li>
            <li><a href="#" className="nav-link">Галерея</a></li>
            <li><a href="#" className="nav-link">Команда</a></li>
            <li><a href="#" className="nav-link">Отзывы</a></li>
            <li><a href="#" className="nav-link">Контакты</a></li>
          </ul>
        </nav>
      </header>

      <section className="step-indicator-section">
        <div className="steps-row">
          <div className="step-item completed"><div className="step-circle"><span>1</span></div><div className="skeleton-bar"></div></div>
          <div className="step-item active"><div className="step-circle"><span>2</span></div><div className="skeleton-bar"></div></div>
          <div className="step-item pending"><div className="step-circle"><span>3</span></div><div className="skeleton-bar"></div></div>
          <div className="step-item pending"><div className="step-circle"><span>4</span></div><div className="skeleton-bar"></div></div>
          <div className="step-item pending last-step"><div className="step-circle"><span>5</span></div></div>
        </div>
      </section>

      <main className="main-content">
        <div className="content-header">
          <div className="back-and-title">
            <button className="back-btn"><span>&larr;</span> Назад</button>
            <h1 className="page-title">Выбор даты и времени</h1>
          </div>
          <p className="page-subtitle">Выберите день и подходящий слот, чтобы продолжить оформление записи</p>
        </div>

        <div className="booking-layout">
          <article className="calendar-card">
            <CalendarHeader currentDate={currentDate} onPrev={handlePrevMonth} onNext={handleNextMonth} />
            <CalendarGrid currentDate={currentDate} selectedDate={selectedDate} onDayClick={handleDayClick} />
          </article>

          <aside className="time-slots-card">
            {isLoadingSlots ? (
              <div className="slots-loading">Загрузка слотов...</div>
            ) : error ? (
              <div className="slots-error">{error}</div>
            ) : (
              <TimeSlots selectedTime={selectedTime} slots={slots} onTimeClick={handleTimeClick} />
            )}
          </aside>
        </div>

        <BottomBar selectedDate={selectedDate} selectedTime={selectedTime} />
      </main>

      <footer className="site-footer">
        <div className="footer-cols">
          <div className="footer-col brand-col">
            <div className="brand-logo-white">У ДЯДИ БИЛЛИ</div>
            <p className="footer-desc">Лучшая стрижка в городе.</p>
          </div>
          <div className="footer-col contacts-col">
            <h4 className="col-title">КОНТАКТЫ</h4>
            <ul className="contact-list">
              <li>ул. Садовая, 15, Москва</li>
              <li>+7 (999) 123-45-67</li>
            </ul>
          </div>
          <div className="footer-col hours-col">
            <h4 className="col-title">РЕЖИМ РАБОТЫ</h4>
            <ul className="hours-list">
              <li>Пн–Пт: 9:00 – 21:00</li>
              <li>Сб–Вс: 10:00 – 19:00</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026. Все права защищены.</span>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </footer>
    </div>
  );
}

export default App;