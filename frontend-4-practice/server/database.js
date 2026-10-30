const baseSlots = [
  { time: "10:00", available: true },
  { time: "11:00", available: true },
  { time: "12:00", available: false },
  { time: "13:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: false }, 
  { time: "16:00", available: true },
  { time: "17:00", available: true },
  
];

export const database = {
  today: { day: 31, month: 9, year: 2026 },

  slotsEvenDay: baseSlots,
  slotsOddDay: baseSlots.map(slot => ({
    ...slot,
    available: slot.time !== "11:00" && slot.time !== "16:00"
  }))
};