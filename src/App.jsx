import './App.css';
import Button from './components/Button/Button.jsx';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';

function App() {
	const data = [
		{
			title: 'Подготовка к обновлению курсов',
			text: 'Горные походы открывают удивительные природные ландшафт',
			date: new Date()
		},
		{
			title: 'Поход в годы',
			text: 'Думал, что очень много времени',
			date: new Date()
		}
	];
	const kaka = 1;
	return (
		<>
			<h1>проект</h1>
			<CardButton>
				<JournalItem
					title={data[0].title}
					text={data[0].text}
					date={data[0].date}
				/>
				<h1>{kaka}</h1>
			</CardButton>
			<CardButton>
				<JournalItem
					title={data[1].title}
					text={data[1].text}
					date={data[1].date}
				/>
			</CardButton>
			<JournalItem
				title={data[0].title}
				text={data[0].text}
				date={data[0].date}
			/>
			<CardButton>
				<JournalItem />
			</CardButton>

			
			<Button></Button>
			<Button />
		</>
	);
}

export default App;
