import './Button.css';
import { memo, useState } from 'react';

function Button({ children, onClick }) {
    console.log('Button');
    return (
        <>
            <button onClick={onClick} className="button accent">
                {children}
            </button>
        </>
    );
}

export default memo(Button); // тут memo не будет работать, тк один пропс onClick - функция, которая создается при каждом ререндере в Header, а значит это будут разные объекты (одинаковые внутри, но разные по ссылке)
