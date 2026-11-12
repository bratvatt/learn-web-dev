from salon import appointments, create_appointment


def main() -> None:
    appointments.clear()
    first = create_appointment('Иванова А.А.', 1, 1, '10:00')
    second = create_appointment('Петрова А.А.', 1, 1, '11:00')
    assert first is not None and second is not None

    print('Список записей:')
    for appointment in appointments:
        print(appointment.client_name, appointment.time)

    appointments.clear()
    no_correct_appointment = create_appointment('', 1, 1, '12:00')
    print('\nПустое имя:', no_correct_appointment)
    print('Количество записей:', len(appointments))

    appointments.clear()
    no_correct_time = create_appointment('Сидорова А.А.', 1, 1, '00:00')
    print('\nВремя 00:00:', no_correct_time)
    print('Количество записей:', len(appointments))

    print('\nГраницы часов работы:')
    for time in ('07:59', '08:00', '20:00', '20:01'):
        appointments.clear()
        result = create_appointment('Проверка границы', 1, 1, time)
        print(f'{time}: {"разрешено" if result is not None else "отклонено"}')

    print('\nПрочие проверки:')
    cases = [
        ('   ', 1, 1, '10:00', 'имя из пробелов'),
        ('Иванова А.А.', 99, 1, '10:00', 'несуществующий мастер'),
        ('Иванова А.А.', 1, 99, '10:00', 'несуществующая услуга'),
        ('Иванова А.А.', 1, 1, '25:00', 'несуществующий час'),
        ('Иванова А.А.', 1, 1, '10:70', 'несуществующие минуты'),
        ('Иванова А.А.', 1, 1, 'десять', 'не время вообще'),
    ]
    for name, master_id, service_id, time, label in cases:
        appointments.clear()
        result = create_appointment(name, master_id, service_id, time)
        print(f'{label}: {"создано" if result is not None else "отклонено"}')

    appointments.clear()
    create_appointment('Иванова А.А.', 1, 1, '10:00')
    duplicate = create_appointment('Петрова А.А.', 1, 1, '10:00')
    other_master = create_appointment('Сидорова А.А.', 2, 1, '10:00')
    print('\nТот же мастер и время:', duplicate)
    print('Другой мастер, то же время:', other_master)


if __name__ == '__main__':
    main()