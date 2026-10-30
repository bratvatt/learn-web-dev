// src/data/date.js
export const MONTHS_NOMINATIVE = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function isPastDate(day, month, year) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(year, month, day);
  return checkDate < today;
}

export function generateTimeSlots(date) {
  const slots = [];
  const targetDate = date || new Date();
  const seed = targetDate.getDate() + targetDate.getMonth() + targetDate.getFullYear();

  for (let i = 10; i <= 19; i++) {
    const isBusy = (i + seed) % 3 === 0;
    slots.push({ time: `${i}:00`, busy: isBusy });
  }
  return slots;
}