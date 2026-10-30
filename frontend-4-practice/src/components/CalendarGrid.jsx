import { getDaysInMonth, isPastDate } from '../data/date';

function CalendarGrid({ currentDate, selectedDate, onDayClick }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  const daysArray = [];
  let firstDayOfWeek = new Date(year, month, 1).getDay(); 
  if (firstDayOfWeek === 0) firstDayOfWeek = 7; 

  for (let i = 1; i < firstDayOfWeek; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  return (
    <>
      <div className="weekdays-row">
        <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span>
        <span>Пт</span><span>Сб</span><span>Вс</span>
      </div>
      <div className="days-grid">
        {daysArray.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="day-cell empty" />;
          }

          const isPast = isPastDate(day, month, year);
          const isSelected = selectedDate && 
                             selectedDate.getDate() === day && 
                             selectedDate.getMonth() === month && 
                             selectedDate.getFullYear() === year;

          let cellClass = 'day-cell';
          if (isPast) cellClass += ' past';
          else cellClass += ' available';
          if (isSelected) cellClass += ' selected';

          return (
            <div 
              key={day} 
              className={cellClass}
              onClick={() => !isPast && onDayClick(day, month, year)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CalendarGrid;