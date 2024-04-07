import { useState } from 'react';
import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';

function App() {
    const INITIAL_DATA = [
        // {
        //     id: 1,
        //     title: 'Подготовка к обновлению курсов',
        //     text: 'Горные походы открывают удивительные природные ландшафт',
        //     date: new Date(),
        // },
        // {
        //     id: 2,
        //     title: 'Поход в годы',
        //     text: 'Думал, что очень много времени',
        //     date: new Date(),
        // },
    ];

    const [items, setItems] = useState(INITIAL_DATA);

    console.log(items);
    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    };

    const addItem = (item) => {
        setItems((oldItems) => [
            {
                id: oldItems.length
                    ? Math.max(...oldItems.map((item) => item.id)) + 1
                    : 0,
                title: item.title,
                text: item.text,
                date: item.date !== '' ? new Date(item.date) : new Date(),
            },
            ...oldItems,
        ]);
        // setItems([item, ...items]);
    };

    return (
        <div className="app">
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList>
                    {items.length === 0 ? (
                        <p>Еще нет записей, добавьте первую</p>
                    ) : (
                        items.sort(sortItems).map((item) => {
                            return (
                                <CardButton key={item.id}>
                                    {/* key используем для того, чтобы не перерендеривался весь список */}
                                    <JournalItem
                                        title={item.title}
                                        text={item.text}
                                        date={item.date}
                                    />
                                </CardButton>
                            );
                        })
                    )}
                </JournalList>
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
