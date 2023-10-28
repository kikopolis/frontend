import React, {ChangeEvent} from "react";

export default function DatePicker({handleDateTimeChange}: {
    handleDateTimeChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
    const onDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
        handleDateTimeChange(event);
    }
    return (
        <div className={'row'}>
            <input
                className={'col-4 mx-auto mt-4'}
                type="date"
                onChange={(e) => onDateChange(e)}/>
        </div>
    );
}
