import { generateTimeSlots } from '../data/date';

function TimeSlots({ selectedDate, selectedTime, onTimeClick }) {
  const slots = generateTimeSlots(selectedDate);

  return (
    <div className="time-slots-card">
      <h3 className="slots-title">Доступное время</h3>
      <div className="time-grid">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          
          return (
            <button
              key={slot.time}
              className={`slot-btn ${slot.busy ? 'busy' : 'available'} ${isSelected ? 'selected-time' : ''}`}
              disabled={slot.busy}
              onClick={() => !slot.busy && onTimeClick(slot.time)}
            >
              {slot.time}
              {slot.busy && <><br /><small>Занято</small></>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlots;