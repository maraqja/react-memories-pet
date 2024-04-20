import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const logos = ['/logo.svg', '/vite.svg'];
function Header() {
    const [logoIndex, setLogoIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);

    console.log('Header');

    // const toggleLogo = useCallback(() => {
    //     setLogoIndex((state) => Number(!Boolean(state)));
    //     setSecondIndex((i) => i + 1);
    //     console.log(secondIndex);
    // }, []); // запоминаем функцию для memo в Button (работает как useState, только для функции)

    const toggleLogo = () => {
        // в рамках этого блока дважды обновляем стейт, но ререндер будет один раз - это batching - реакт объединит все обновления в одно
        setLogoIndex((state) => Number(!Boolean(state)));
        setSecondIndex((i) => i + 1);
        console.log(secondIndex); // всегда будет выводиться предыдущее значение, что связано с тем, что Реакт использует планировщик стейта - при изменении стейта Реактом планируется изменение в будущем, но не сразу (там очередь FIFO)
    };

    return (
        <>
            <Logo image={logos[0]} />
            <SelectUser />
            <Button onClick={toggleLogo}>Сменить лого</Button>
        </>
    );
}

export default Header;
