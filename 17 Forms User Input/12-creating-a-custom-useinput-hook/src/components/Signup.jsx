import { useState } from 'react';

export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   * @returns {void}
   *
   * This function prevents the default form submission behavior, extracts form data,
   * and checks if the password and confirm password fields match. If they do not match,
   * it sets a state indicating the passwords are not equal and stops further processing.
   * If they match, it logs the form data to the console.
   * FormData is used to extract form data from the form element. 
   * The FormData.entries method returns an iterator over the form data entries.
   * The Object.fromEntries method converts the iterator to an object.
   * The acquisition channel is extracted as an array because the form data may contain multiple
   * acquisition channels. The form data is then logged to the
   * console. The password and confirm password fields are compared to check if they match.
   * If they do not match, the passwordsAreNotEqual state is set to true.
   * The passwordsAreNotEqual state is used to display an error message in the form
   * if the passwords do not match.
   */
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll('acquisition'); // by name
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    if (data.password !== data['confirm-password']) {
      setPasswordsAreNotEqual(true);
      return;
    }
    // reset the form after submission
    event.target.reset();
    setPasswordsAreNotEqual(false);
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required /> { /* name attribute is required for FormData to work properly */}
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">
            {passwordsAreNotEqual && <p>Passwords must match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required // browser build in validation (max ...) will not allow to submit form if this is not checked
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat"> {/* type of buttons are important in forms as reset and submit buttons*/}
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
