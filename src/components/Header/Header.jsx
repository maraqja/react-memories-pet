import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const logos = ['/logo.svg', '/vite.svg'];
function Header() {
    return (
        <>
            <Logo image={logos[0]} />
            <SelectUser />
        </>
    );
}

export default Header;
