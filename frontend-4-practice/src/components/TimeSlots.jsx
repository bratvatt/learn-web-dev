function TimeSlots({ selectedTime, slots, onTimeClick }) {
  return (
    <>
      <h3 className="slots-title">Доступное время</h3>
      <div className="time-grid">
        {slots.map((slot) => (
          <button
            key={slot.time}
            className={`slot-btn ${slot.available ? 'available' : 'busy'} ${selectedTime === slot.time ? 'selected-time' : ''}`}
            disabled={!slot.available}
            onClick={() => slot.available && onTimeClick(slot.time)}
          >
            {slot.time}
            {!slot.available && <><br /><small>Занято</small></>}
          </button>
        ))}
      </div>
    </>
  );
}

export default TimeSlots;