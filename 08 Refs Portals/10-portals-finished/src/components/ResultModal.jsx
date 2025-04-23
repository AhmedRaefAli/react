import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal( // use foward ref to pass ref to our custom components in old react
  { targetTime, remainingTime, onReset },
  ref
) {
	const dialog = useRef(); // ref to our dialog element

	const userLost = remainingTime <= 0;
	const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

	//useImperativeHandle is a React hook that lets you customize the instance value
	//  that is exposed when using ref with a component. It's mostly used
	// with forwarded refs to allow a parent component to call functions or access values inside
	// a child component.
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal(); // show the modal
			},
		};
	});

	return createPortal(
		<dialog ref={dialog} className='result-modal'>
			{userLost && <h2>You lost</h2>}
			{!userLost && <h2>Your Score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime} seconds.</strong>
			</p>
			<p>
				You stopped the timer with{' '}
				<strong>{formattedRemainingTime} seconds left.</strong>
			</p>
			<form method='dialog' onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>,
		document.getElementById('modal')
	);
});

export default ResultModal;
