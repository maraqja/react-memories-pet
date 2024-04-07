import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { useEffect, useState } from 'react';

const INITIAL_STATE = {
    title: true,
    text: true,
    date: true,
};

function JournalForm({ onSubmit }) {
    const [formValidState, setFormValidState] = useState(INITIAL_STATE);

    useEffect(() => {
        // если форма невалидна - красим в красный на 2 сек (но нужно очистить useEffect тк при спаме кнопки "СОздать" при невалидной форме создастся много таймеров)
        let timerId; // запоминаем id таймера для того чтобы удалить таймер вдальнейшем
        if (Object.values(formValidState).includes(false)) {
            timerId = setTimeout(() => setFormValidState(INITIAL_STATE), 2000);
        }
        // очищаем эффект после очередного рендера или после исчезнования компонента
        return () => {
            clearTimeout(timerId); // эта функция будет вызвана перед выполнением следующего эффекта (из-за этого форма не будет моргать красным)
        };
    }, [formValidState]);

    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
        // let isFormValid = true;
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
            title: !formProps.title.trim() ? false : true,
            text: !formProps.text.trim() ? false : true,
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
            <div>
                <input
                    type="text"
                    name="title"
                    className={cn(styles['input-title'], {
                        [styles['invalid']]: !formValidState.title,
                    })}
                />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="date" className={styles['form-label']}>
                    <img src="/calendar.svg" alt="Иконка календаря" />
                    <span>Дата</span>
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    className={cn(styles['input'], {
                        [styles['invalid']]: !formValidState.date,
                    })}
                />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="tag" className={styles['form-label']}>
                    <img src="/folder.svg" alt="Иконка папки" />
                    <span>Метки</span>
                </label>
                <input
                    type="text"
                    id="tag"
                    name="tag"
                    className={styles['input']}
                />
            </div>

            <textarea
                name="text"
                id=""
                cols="30"
                rows="10"
                className={cn(styles['input'], {
                    [styles['invalid']]: !formValidState.text,
                })}
            ></textarea>
            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;
