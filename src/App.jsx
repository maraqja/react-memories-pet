import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map((i) => ({
        ...i,
        date: new Date(i.date),
    }));
}

function App() {
    // const INITIAL_DATA = [
    //     {
    //         id: 1,
    //         title: 'Подготовка к обновлению курсов',
    //         text: 'Горные походы открывают удивительные природные ландшафт',
    //         date: new Date(),
    //     },
    //     {
    //         id: 2,
    //         title: 'Поход в годы',
    //         text: 'Думал, что очень много времени',
    //         date: new Date(),
    //     },
    // ];
    // localStorage.setItem('data', JSON.stringify(INITIAL_DATA));
    console.log('App');

    const [items, setItems] = useLocalStorage('data');

    const addItem = (item) => {
        setItems([
            ...mapItems(items),
            {
                id: items.length
                    ? Math.max(...items.map((item) => item.id)) + 1
                    : 0,
                ...item,
                date: item.date !== '' ? new Date(item.date) : new Date(),
            },
        ]);
    };

    return (
        <>
            <UserContextProvider>
                {/* хотим отображать только записи определенного юзера  - какого конкретно - выбираем в Header в SelectUser компоненте*/}
                <div className="app">
                    <LeftPanel>
                        <Header />
                        <JournalAddButton />
                        <JournalList items={mapItems(items)} />
                    </LeftPanel>
                    <Body>
                        <JournalForm onSubmit={addItem} />
                    </Body>
                </div>
            </UserContextProvider>
        </>
    );
}

export default App;
