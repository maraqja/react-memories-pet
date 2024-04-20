import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
    const { userId } = useContext(UserContext);
    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    };
    // сейчас зависим только от userId и items, но если бы был, например, еще один частоизменяемый пропс, то каждый раз бы выполнялась перефильтрация и пересортировка
    const filteredItems = useMemo(
        () => items.filter((el) => el.userId === userId).sort(sortItems),
        [items, userId]
    ); // каждый раз при смене items или userId будем заново фильтровать и сортировать

    if (items.length === 0) {
        return <p>Записей пока нет, добавьте первую</p>;
    }

    return (
        <>
            {filteredItems.map((el) => (
                <CardButton
                    key={el.id}
                    onClick={() => {
                        console.log(el);
                        setItem(el);
                    }}
                >
                    <JournalItem
                        title={el.title}
                        text={el.text}
                        date={el.date}
                    />
                </CardButton>
            ))}
        </>
    );
}

export default JournalList;
