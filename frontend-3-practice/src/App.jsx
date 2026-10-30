import { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import TimeSlots from './components/TimeSlots';
import BottomBar from './components/BottomBar';
import './styles/styles.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);


  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDayClick = (day, month, year) => {
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null); 
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="app-wrapper">
      {/* Шапка сайта */}
      <header className="site-header">
        <div className="brand-logo">
          <span className="logo-text">У ДЯДИ БИЛЛИ</span>
        </div>
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

      {/* Индикатор шагов */}
      <section className="step-indicator-section">
        <div className="steps-row">
          <div className="step-item completed">
            <div className="step-circle"><span>1</span></div>
            <div className="skeleton-bar"></div>
          </div>
          <div className="step-item active">
            <div className="step-circle"><span>2</span></div>
            <div className="skeleton-bar"></div>
          </div>
          <div className="step-item pending">
            <div className="step-circle"><span>3</span></div>
            <div className="skeleton-bar"></div>
          </div>
          <div className="step-item pending">
            <div className="step-circle"><span>4</span></div>
            <div className="skeleton-bar"></div>
          </div>
          <div className="step-item pending last-step">
            <div className="step-circle"><span>5</span></div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <main className="main-content">
        <div className="content-header">
          <div className="back-and-title">
            <button className="back-btn">
              <span>&larr;</span> Назад
            </button>
            <h1 className="page-title">Выбор даты и времени</h1>
          </div>
          <p className="page-subtitle">
            Выберите день и подходящий слот, чтобы продолжить оформление записи
          </p>
        </div>

        <div className="booking-layout">
          {/* Левая колонка: Календарь */}
          <article className="calendar-card">
            <CalendarHeader 
              currentDate={currentDate} 
              onPrev={handlePrevMonth} 
              onNext={handleNextMonth} 
            />
            <CalendarGrid 
              currentDate={currentDate} 
              selectedDate={selectedDate} 
              onDayClick={handleDayClick} 
            />
          </article>

          {/* Правая колонка: Слоты времени */}
          <aside className="time-slots-card">
            <TimeSlots 
              selectedDate={selectedDate} 
              selectedTime={selectedTime} 
              onTimeClick={handleTimeClick} 
            />
          </aside>
        </div>

        {/* Нижняя панель */}
        <BottomBar 
          selectedDate={selectedDate} 
          selectedTime={selectedTime} 
        />
      </main>

      {/* Подвал */}
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