import './Button.css';
import { useState } from 'react';

function Button() {
	// let text = 'Save';

	const [text, setText] = useState('Save')

	const click = () => {
		console.log(text);
		if (text === 'Save') {
			setText("Close");
		} else {
			setText('Save');
		}
		
		console.log(text);
	}

	return (
		<>
			<button onClick={click} className="button accent">{text}</button>
		</>
	);
}

export default Button;
