import Input from './Input.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import { useInput } from '../hooks/useInput.js';

export default function Login() {

  // here we mange the state of the input fields
  // we use the useInput hook to manage the state of the input fields
  // the useInput hook takes an initial value and a validation function as arguments
  // the validation function is used to check if the input value is valid
  // the useInput hook returns an object with the value of the input field
  // a function to handle input change events
  // a function to handle input blur events
  // and a flag to indicate if the input value is valid
  // we use destructuring to extract the values from the object
  // we pass the value of the input field to the value attribute of the input element
  // we pass the handleInputChange function to the onChange attribute of the input element
  // we pass the handleInputBlur function to the onBlur attribute of the input element
  // we pass the hasError flag to the error attribute of the input element
  // we use the value of the input fields to check if the input values are valid
  // if the input values are not valid we display an error message

  
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value)); // create custom component to manage input state
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6));


  /*
  there is 3 type of validation 
  validate on each key press 
  validate on blur (better for performance and user experience as error wil not show until user finish typing)
  validate on submit  (must on submit )
  */
  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}  // event fire when input lost focus
          onChange={handleEmailChange} // must with state
          value={emailValue} // must with state
          error={emailHasError && 'Please enter a valid email!'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button> {/* button in for default type is submit but you also can set type="button" to prevent submit*/}
      </p>
    </form>
  );
}
