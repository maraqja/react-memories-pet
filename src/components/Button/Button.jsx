import './Button.css';
import { useState } from 'react';

function Button({ text, onClick }) {
    const [buttonText, setText] = useState(text);

    return (
        <>
            <button onClick={onClick} className="button accent">
                {buttonText}
            </button>
        </>
    );
}

export default Button;
