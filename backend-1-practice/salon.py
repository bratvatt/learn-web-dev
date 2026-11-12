"""Салон «У Дяди Билли»: модели и операции над записями."""

from dataclasses import dataclass
import re

OPENING_MINUTES = 8 * 60
CLOSING_MINUTES = 20 * 60

TIME_PATTERN = re.compile(r'[0-2][0-9]:[0-5][0-9]')


def positive_id(value: object) -> bool:
    return type(value) is int and value > 0


def parse_time(value: object) -> int | None:
    if not isinstance(value, str) or TIME_PATTERN.fullmatch(value) is None:
        return None
    hours, minutes = map(int, value.split(':'))
    if hours > 23:
        return None
    return hours * 60 + minutes


@dataclass(frozen=True, slots=True)
class Master:
    master_id: int
    name: str


@dataclass(frozen=True, slots=True)
class Service:
    service_id: int
    name: str
    price: int = 0


@dataclass(frozen=True, slots=True)
class Appoinment:

    id: int
    client_name: str
    master_id: int
    service_id: int
    time: str

    def __post_init__(self) -> None:
        if not all(positive_id(v) for v in (self.id, self.master_id, self.service_id)):
            raise ValueError('Идентификаторы должны быть положительными целыми числами.')

        if not isinstance(self.client_name, str) or not self.client_name.strip():
            raise ValueError('Укажите имя клиента.')

        minutes = parse_time(self.time)
        if minutes is None:
            raise ValueError('Время должно быть в формате HH:MM.')
        if not OPENING_MINUTES <= minutes <= CLOSING_MINUTES:
            raise ValueError('Салон работает с 08:00 до 20:00.')

        object.__setattr__(self, 'client_name', self.client_name.strip())

    def __str__(self) -> str:
        return f'Запись №{self.id}: {self.client_name} — {self.time}'


masters = [Master(1, 'Дядя Билли'), Master(2, 'Никитка')]
services = [Service(1, 'Мужская стрижка', 1500), Service(2, 'Оформление бороды', 900)]
appointments: list[Appoinment] = []


def get_master(master_id: int) -> Master | None:
    return next((m for m in masters if m.master_id == master_id), None)


def get_service(service_id: int) -> Service | None:
    return next((s for s in services if s.service_id == service_id), None)


def is_slot_taken(master_id: int, time: str) -> bool:
    return any(a.master_id == master_id and a.time == time for a in appointments)


def create_appointment(
    client_name: str, master_id: int, service_id: int, time: str,
) -> Appoinment | None:
    if not positive_id(master_id) or not positive_id(service_id):
        return None

    master = get_master(master_id)
    service = get_service(service_id)
    if master is None or service is None:
        return None

    if is_slot_taken(master.master_id, time):
        return None

    next_id = max((a.id for a in appointments), default=0) + 1
    try:
        appointment = Appoinment(next_id, client_name, master.master_id, service.service_id, time)
    except ValueError:
        return None

    appointments.append(appointment)
    return appointment