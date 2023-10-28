import {useEffect} from "react";

export default function MonthDisplay({dateTime}: { dateTime: Date | null }) {
    const calendarDatesRow: HTMLElement | null = document.getElementById('calendarDates');

    useEffect((): void => {
        drawCalendar();
    });

    const drawCalendar = (): void => {
        if (!calendarDatesRow || !dateTime) {
            return;
        }
        calendarDatesRow.innerHTML = '';
        const today: Date = new Date();
        const month: number = dateTime.getMonth();
        const year: number = dateTime.getFullYear();
        const daysInMonth: number = getDaysInMonth(month, year);
        for (let i: number = 0; i < daysInMonth / 7; i++) {
            const row: HTMLDivElement = document.createElement('div');
            row.className = 'row w-100';
            calendarDatesRow.appendChild(row);
            for (let j: number = 0; j < 7; j++) {
                const dayNumber: number = i * 7 + j + 1;
                if (dayNumber > daysInMonth) {
                    break;
                }
                const day: Date = new Date(year, month, dayNumber);
                const dateElement: HTMLElement = drawDateBox(day);
                if (day.getDate() === dateTime.getDate()
                    && day.getMonth() === today.getMonth()
                    && day.getFullYear() === today.getFullYear()) {
                    dateElement.classList.add('bg-primary');
                    dateElement.classList.add('text-white');
                }
                row.appendChild(dateElement);
            }
        }
    }

    const isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    const getDaysInMonth = (month: number, year: number): number => {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30][month];
    }

    const drawDateBox = (day: Date): HTMLElement => {
        const dateElement: HTMLDivElement = document.createElement('div');
        const dateElementText: HTMLSpanElement = document.createElement('span');
        dateElementText.innerText = day.getDate().toString();
        dateElement.className = 'px-3 text-center border';
        dateElement.style.width = '14.28%';
        dateElement.appendChild(dateElementText);
        return dateElement;
    }

    return (
        <div className="row">
            <div className={'col-6 mx-auto my-4'} id="calendarDates"></div>
        </div>
    );
}
