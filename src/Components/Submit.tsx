import {useEffect} from "react";

export default function Submit({dateTime, errorHandler}: {
    dateTime: Date | null,
    errorHandler: (error: string | null) => void
}) {
    const button: HTMLElement | null = document.getElementById('submitButton');

    useEffect((): void => {
        checkDate();
    });

    const checkDate = (): void => {
        if (!button || !dateTime) {
            return;
        }
        const today: Date = new Date();
        if (dateTime.getMonth() === today.getMonth()
            && dateTime.getFullYear() === today.getFullYear()) {
            button.classList.remove('disabled');
        } else {
            button.classList.add('disabled');
        }
    }

    const submitDate = (): void => {
        if (!dateTime) {
            return;
        }
        const utcDate: string = dateTime.toISOString();
        fetch('http://localhost:3000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: utcDate})
        })
            .then(response => {
                if (response.status === 404) {
                    errorHandler('Cannot find server.');
                    return;
                }
                if (response.status === 400) {
                    errorHandler('Invalid date.');
                    return;
                }
                if (response.status === 500) {
                    errorHandler('Server error.');
                    return;
                }
                if (response.status !== 200) {
                    errorHandler('Unknown error.');
                }
            })
            .catch(() => errorHandler('Unknown error.'))
    }

    return (
        <div>
            <button onClick={submitDate}
                    id="submitButton"
                    type="submit"
                    className="btn btn-primary disabled">
                Submit
            </button>
        </div>
    );
}
