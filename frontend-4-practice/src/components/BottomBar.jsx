const DAYS_OF_WEEK_FULL = [
  'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
  'Четверг', 'Пятница', 'Суббота'
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function BottomBar({ selectedDate, selectedTime }) {
  let text = 'Дата не выбрана';

  if (selectedDate) {
    const dayName = DAYS_OF_WEEK_FULL[selectedDate.getDay()];
    const dayNum = selectedDate.getDate();
    const monthName = MONTHS_GENITIVE[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();
    
    text = `${dayName}, ${dayNum} ${monthName} ${year}`;
    
    if (selectedTime) {
      text += ` • ${selectedTime}`;
    }
  }

  return (
    <div className="footer-cta-bar">
      <span className="selection-helper">Выбрано: {text}</span>
      <button className="next-button">Далее</button>
    </div>
  );
}

export default BottomBar;