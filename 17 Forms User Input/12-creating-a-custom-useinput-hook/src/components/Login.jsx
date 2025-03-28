import { useRef, useState } from 'react';

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  // we use the useRef hook to store the value of the input fields
  // we can access the value of the input fields using the current property
  // we can also use the current property to store the value of the input fields
  // less code and less rerendering compared to using the useState hook
  // but downside is that we have to manually check for the value of the input fields
  // and we have to manually reset the value of the input fields
  // but update of the value of the input fields does not trigger a rerender
  // so it is more efficient than using the useState hook
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    // forms has a default behavior of refreshing the page when submitted and send a request to the server
    // to prevent this we use the preventDefault method
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes('@');

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log('Sending HTTP request...');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
