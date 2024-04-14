import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { useEffect, useReducer, useState } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { values, isValid, isFormReadyToSubmit } = formState; // деструктурируем стейт, чтобы подписаться в useEffect только на изменения определенных свойств (чтобы не было единого useEffect-а на при изменение formState с кучей условий)

    useEffect(() => {
        // если форма невалидна - красим в красный на 2 сек (но нужно очистить useEffect тк при спаме кнопки "СОздать" при невалидной форме создастся много таймеров)
        let timerId; // запоминаем id таймера для того чтобы удалить таймер вдальнейшем
        if (Object.values(isValid).includes(false)) {
            timerId = setTimeout(
                () => dispatchForm({ type: 'RESET_VALIDITY' }),
                2000
            );
        }
        // очищаем эффект после очередного рендера или после исчезнования компонента
        return () => {
            clearTimeout(timerId); // эта функция будет вызвана перед выполнением следующего эффекта (из-за этого форма не будет моргать красным)
        };
    }, [isValid]); // подписываемся на изменение определенного свойства состояния формы

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: 'CLEAR' });
        }
    }, [isFormReadyToSubmit]);

    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        dispatchForm({ type: 'SUBMIT' }); // тут свойство isFormReadyToSubmit будет установлено в true если все ОК - тогда обработаем с useEffect это
    };

    const onChange = (e) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { [e.target.name]: e.target.value },
        });
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div>
                <input
                    type="text"
                    onChange={onChange}
                    name="title"
                    value={values.title}
                    className={cn(styles['input-title'], {
                        [styles['invalid']]: !isValid.title,
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
                    onChange={onChange}
                    name="date"
                    value={values.date}
                    id="date"
                    className={cn(styles['input'], {
                        [styles['invalid']]: !isValid.date,
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
                    onChange={onChange}
                    value={values.tag}
                    id="tag"
                    name="tag"
                    className={styles['input']}
                />
            </div>

            <textarea
                name="text"
                onChange={onChange}
                value={values.text}
                id=""
                cols="30"
                rows="10"
                className={cn(styles['input'], {
                    [styles['invalid']]: !isValid.text,
                })}
            ></textarea>
            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;
