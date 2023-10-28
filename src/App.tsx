import React, {ChangeEvent, useState} from 'react';
import DatePicker from './Components/DatePicker';
import MonthDisplay from "./Components/MonthDisplay";
import './App.css';
import Submit from "./Components/Submit";
import Error from "./Components/Error";

function App() {
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            return;
        }
        const date: Date = new Date(event.target.value);
        setDateTime(date);
        checkError(date);
    }

    const errorHandler = (error: string | null): void => {
        setError(error);
    }

    const checkError = (date: Date): void => {
        if (!isDateInCurrentMonth(date)) {
            setError('Date must be in current month');
        } else {
            setError(null);
        }
    }

    const isDateInCurrentMonth = (date: Date): boolean => {
        const today: Date = new Date();
        return date.getMonth() === today.getMonth()
            && date.getFullYear() === today.getFullYear();
    }

    return (
        <div className="App">
            <DatePicker handleDateTimeChange={handleDateTimeChange}/>
            <MonthDisplay dateTime={dateTime}/>
            <Submit dateTime={dateTime} errorHandler={errorHandler}/>
            <Error error={error}/>
        </div>
    );
}

export default App;
