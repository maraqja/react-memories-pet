import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {
    const [inputData, setInputData] = useState('');

    const [arr, setArr] = useState([1, 2, 3]);

    const addJournalItem = (e) => {
        e.preventDefault();
        arr.push(2);
        setArr([...arr]);

        const formData = new FormData(e.target);

        const formProps = Object.fromEntries(formData);

        console.log(formProps);
    };

    return (
        <form className="journal-form" onSubmit={addJournalItem}>
            {arr.length}
            <input type="text" name="title" />
            <input type="date" name="date" />
            {inputData}
            <input
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
            />
            <textarea name="post" id="" cols="30" rows="10"></textarea>
            <Button
                text="Сохранить"
                onClick={() => {
                    console.log('Нажали');
                }}
            />
        </form>
    );
}

export default JournalForm;
