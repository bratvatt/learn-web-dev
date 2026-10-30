document.addEventListener('DOMContentLoaded', () => {
    const MONTHS_NOMINATIVE = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    const DAYS_OF_WEEK_FULL = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let state = {
        currentDate: new Date(),
        selectedDate: null,
        selectedTime: null
    };

    const monthTitleEl = document.querySelector('.current-month');
    const daysGridEl = document.querySelector('.days-grid');
    const prevBtn = document.querySelector('.control-btn:first-child');
    const nextBtn = document.querySelector('.control-btn:last-child');
    const timeSlotsContainer = document.querySelector('.time-grid');
    const selectionHelper = document.querySelector('.selection-helper');

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 7 : day;
    }

    function isPastDate(day, month, year) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(year, month, day);
        return checkDate < today;
    }


    function generateTimeSlots(date) {
        const slots = [];
        const targetDate = date || state.selectedDate || new Date();
        
        const seed = targetDate.getDate() + targetDate.getMonth() + targetDate.getFullYear();

        for (let i = 10; i <= 19; i++) {
            const isBusy = (i + seed) % 3 === 0; 
            
            slots.push({
                time: `${i}:00`,
                busy: isBusy
            });
        }
        return slots;
    }

    function renderCalendar() {
        const year = state.currentDate.getFullYear();
        const month = state.currentDate.getMonth();

        monthTitleEl.textContent = `${MONTHS_NOMINATIVE[month]} ${year}`;
        daysGridEl.innerHTML = '';

        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        for (let i = 1; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell empty';
            daysGridEl.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            cell.textContent = day;

            const isPast = isPastDate(day, month, year);
            
            let isSelected = false;
            if (state.selectedDate) {
                isSelected = (
                    state.selectedDate.getDate() === day &&
                    state.selectedDate.getMonth() === month &&
                    state.selectedDate.getFullYear() === year
                );
            }

            if (isPast) {
                cell.classList.add('past');
            } else {
                cell.classList.add('available');
                cell.addEventListener('click', () => handleDayClick(day, month, year));
            }

            if (isSelected) {
                cell.classList.add('selected');
            }

            daysGridEl.appendChild(cell);
        }
    }

    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        const slots = generateTimeSlots(state.selectedDate);

        slots.forEach(slot => {
            const btn = document.createElement('button');
            btn.className = `slot-btn ${slot.busy ? 'busy' : 'available'}`;
            
            if (slot.busy) {
                btn.disabled = true;
                btn.innerHTML = `${slot.time}<br><small>Занято</small>`;
            } else {
                btn.textContent = slot.time;
                if (state.selectedTime === slot.time) {
                    btn.style.background = '#3E3A35';
                    btn.style.color = '#fff';
                }
                btn.addEventListener('click', () => handleTimeClick(slot.time));
            }
            timeSlotsContainer.appendChild(btn);
        });
    }

    function updateBottomBar() {
        if (!state.selectedDate) {
            selectionHelper.textContent = 'Дата не выбрана';
            return;
        }

        const d = state.selectedDate;
        let dateStr = `${DAYS_OF_WEEK_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS_NOMINATIVE[d.getMonth()].toLowerCase()} ${d.getFullYear()}`;
        
        if (state.selectedTime) {
            dateStr += ` • ${state.selectedTime}`;
        }

        selectionHelper.textContent = `Выбрано: ${dateStr}`;
    }

    function handleDayClick(day, month, year) {
        state.selectedDate = new Date(year, month, day);
        state.selectedTime = null;
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
    }

    function handleTimeClick(time) {
        state.selectedTime = time;
        renderTimeSlots();
        updateBottomBar();
    }

    prevBtn.addEventListener('click', () => {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        renderCalendar();
    });

    const today = new Date();
    if (!isPastDate(today.getDate(), today.getMonth(), today.getFullYear())) {
        state.selectedDate = today;
    }
    
    if (state.selectedDate) {
        state.currentDate = new Date(state.selectedDate);
    }

    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
});