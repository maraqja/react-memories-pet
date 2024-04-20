import { memo } from 'react';
import styles from './Logo.module.css';

function Logo({ image }) {
    console.log('Logo');

    return <img className={styles.logo} src={image} alt="Логотип журнала" />;
}

export default memo(Logo); // каждый раз, когда выполняется компонент-родитель (тот, где в return вызывается Logo - у нас это Header, например) проверяет нужно ли заново исполнять эту функцию - сравнивает пропсы
