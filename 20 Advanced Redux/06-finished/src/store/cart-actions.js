import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

// those are redux thunks, they are functions that return functions that dispatch actions
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};



// action creator used to create thunk
// thunk is a function that returns another function
// the inner function will be executed
// we can dispatch multiple actions inside the inner function
// we can also dispatch async actions
// we can also dispatch actions conditionally
// we can also access the state
// we can also send HTTP requests
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({ // that also an action creator
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
