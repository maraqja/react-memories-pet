import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { values, isValid, isFormReadyToSubmit } = formState; // деструктурируем стейт, чтобы подписаться в useEffect только на изменения определенных свойств (чтобы не было единого useEffect-а на при изменение formState с кучей условий)

    const titleRef = useRef(); // для связи элемента в html с react - можно обращаться к этому элементу по titleRef
    const textRef = useRef();
    const dateRef = useRef();

    const { userId } = useContext(UserContext);

    const focusError = (isValid) => {
        for (const [key, value] of Object.entries(isValid)) {
            if (!value) {
                switch (key) {
                    case 'title':
                        titleRef.current.focus();
                        return;
                    case 'text':
                        textRef.current.focus();
                        return;
                    case 'date':
                        dateRef.current.focus();
                        return;
                }
            }
        }
    };

    useEffect(() => {
        if (!data) {
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId } }); // чтобы не потерять userId после очистки формы
        }
        dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
    }, [data]);

    useEffect(() => {
        // если форма невалидна - красим в красный на 2 сек (но нужно очистить useEffect тк при спаме кнопки "СОздать" при невалидной форме создастся много таймеров)
        let timerId; // запоминаем id таймера для того чтобы удалить таймер вдальнейшем
        if (Object.values(isValid).includes(false)) {
            focusError(isValid);
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
            dispatchForm({ type: 'SET_VALUE', payload: { userId } }); // чтобы не потерять userId после очистки формы
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }, [userId]);

    const addJournalItem = (e) => {
        e.preventDefault();

        dispatchForm({ type: 'SUBMIT' }); // тут свойство isFormReadyToSubmit будет установлено в true если все ОК - тогда обработаем с useEffect это
    };

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: 'CLEAR' });
        dispatchForm({ type: 'SET_VALUE', payload: { userId } }); // чтобы не потерять userId после очистки формы
    };

    const onChange = (e) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { [e.target.name]: e.target.value },
        });
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            {userId}
            <div className={styles['form-row']}>
                <Input
                    type="text"
                    onChange={onChange}
                    isValid={isValid.title}
                    name="title"
                    ref={titleRef}
                    value={values.title}
                    appearence="title"
                />
                {data?.id ? (
                    <button
                        className={styles['delete']}
                        type="button"
                        onClick={deleteJournalItem}
                    >
                        <img src="/archive.svg" alt="Кнопка удалить" />
                    </button>
                ) : (
                    ''
                )}
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="date" className={styles['form-label']}>
                    <img src="/calendar.svg" alt="Иконка календаря" />
                    <span>Дата</span>
                </label>
                <Input
                    type="date"
                    onChange={onChange}
                    isValid={isValid.date}
                    name="date"
                    ref={dateRef}
                    value={
                        values.date
                            ? new Date(values.date).toISOString().slice(0, 10)
                            : ''
                    }
                    id="date"
                />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="tag" className={styles['form-label']}>
                    <img src="/folder.svg" alt="Иконка папки" />
                    <span>Метки</span>
                </label>
                <Input
                    type="text"
                    onChange={onChange}
                    value={values.tag}
                    id="tag"
                    name="tag"
                />
            </div>
            <textarea
                name="text"
                onChange={onChange}
                ref={textRef}
                value={values.text}
                id=""
                cols="30"
                rows="10"
                className={cn(styles['input'], {
                    [styles['invalid']]: !isValid.text,
                })}
            ></textarea>
            <Button>Сохранить</Button>
        </form>
    );
}

export default JournalForm;
