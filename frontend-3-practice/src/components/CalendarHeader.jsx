import { MONTHS_NOMINATIVE } from '../data/date';

function CalendarHeader({ currentDate, onPrev, onNext }) {
  const monthName = MONTHS_NOMINATIVE[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className="month-header">
      <h2 className="current-month">{monthName} {year}</h2>
      <div className="nav-controls">
        <button className="control-btn" onClick={onPrev}>&lt;</button>
        <button className="control-btn" onClick={onNext}>&gt;</button>
      </div>
    </div>
  );
}

export default CalendarHeader;