import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ onSubmit }) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        text: true,
        date: true,
    });

    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
        let isFormValid = true;
        // if (!formProps.title.trim().length) {S
        //     setFormValidState((state) => {
        //         return { ...state, title: false };
        //     });
        //     isFormValid = false;
        // } else {
        //     setFormValidState((state) => {
        //         return { ...state, title: true };
        //     });
        // }
        // if (!formProps.text.trim().length) {
        //     setFormValidState((state) => {
        //         return { ...state, text: false };
        //     });
        //     isFormValid = false;
        // }
        // if (!formProps.date) {
        //     setFormValidState((state) => {
        //         return { ...state, date: false };
        //     });
        //     isFormValid = false;
        // }

        // if (!isFormValid) {
        //     return;
        // }
        const newState = {
            title: !formProps.title.trim().length ? false : true,
            text: !formProps.text.trim().length ? false : true,
            date: !formProps.date ? false : true,
        };
        setFormValidState(newState);
        if (Object.values(newState).includes(false)) {
            return;
        }

        onSubmit(formProps);
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <input
                type="text"
                name="title"
                className={`${styles['input']} ${
                    formValidState.title ? '' : styles['invalid']
                }`}
            />
            <input
                type="date"
                name="date"
                className={`${styles['input']} ${
                    formValidState.date ? '' : styles['invalid']
                }`}
            />
            <textarea
                name="text"
                id=""
                cols="30"
                rows="10"
                className={`${styles['input']} ${
                    formValidState.text ? '' : styles['invalid']
                }`}
            ></textarea>
            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;
