import './CardButton.css';

function CardButton({children}) {
	console.log(children);
	return (
		<>
			<button className="card-button">{children}</button>
		</>
	);
}

export default CardButton;
