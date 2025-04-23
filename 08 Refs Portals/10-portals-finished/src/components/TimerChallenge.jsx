import { useState, useRef } from 'react';

import ResultModal from './ResultModal.jsx';

// let timer;

export default function TimerChallenge({ title, targetTime }) {
	const timer = useRef();
	const dialog = useRef();

	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

	if (timeRemaining <= 0) {
		clearInterval(timer.current);
		dialog.current.open();
	}

	function handleReset() {
		setTimeRemaining(targetTime * 1000);
	}

	// setTimeout is not a good idea here, because it will not be cleared when the component unmounts
	// and it will not be cleared when the timer is stopped
	// so we need to use a ref to store the timer id and clear it when the component unmounts
	function handleStart() {
		timer.current = setInterval(() => {
			setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
		}, 10);
	}

	function handleStop() {
		dialog.current.open();
		clearInterval(timer.current);
	}

	return (
		<>
			<ResultModal
				ref={dialog}
				targetTime={targetTime}
				remainingTime={timeRemaining}
				onReset={handleReset}
			/>
			<section className='challenge'>
				<h2>{title}</h2>
				<p className='challenge-time'>
					{targetTime} second{targetTime > 1 ? 's' : ''}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStop : handleStart}>
						{timerIsActive ? 'Stop' : 'Start'} Challenge
					</button>
				</p>
				<p className={timerIsActive ? 'active' : undefined}>
					{timerIsActive ? 'Time is running...' : 'Timer inactive'}
				</p>
			</section>
		</>
	);
}
