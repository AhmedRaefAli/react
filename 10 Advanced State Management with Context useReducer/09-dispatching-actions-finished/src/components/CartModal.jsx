import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Cart from './Cart.jsx';

const CartModal = forwardRef(function Modal(
  { title, actions },
  ref
) {
	const dialog = useRef();

	//useImperativeHandle is a React hook that lets you customize the instance value
  //  that is exposed when using ref with a component. It's mostly used 
  // with forwarded refs to allow a parent component to call functions or access values inside 
  // a child component.
	useImperativeHandle(ref, () => {
		return {
			open: () => {
				dialog.current.showModal();
			},
		};
	});

	return createPortal(
		<dialog id='modal' ref={dialog}>
			<h2>{title}</h2>
			<Cart />
			<form method='dialog' id='modal-actions'>
				{actions}
			</form>
		</dialog>,
		document.getElementById('modal')
	);
});

export default CartModal;
