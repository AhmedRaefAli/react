import { useState, useRef } from 'react';

export default function Player() {
	const playerName = useRef();

	const [enteredPlayerName, setEnteredPlayerName] = useState(null);
	// useRef is used to get the value of the input field
	// useState is used to store the value of the input field
	// u cant update the ui with ref
	function handleClick() {
		setEnteredPlayerName(playerName.current.value);
		playerName.current.value = '';
	}

	return (
		<section id='player'>
			<h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
			<p>
				<input ref={playerName} type='text' />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
