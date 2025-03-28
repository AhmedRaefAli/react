import { useActionState, use } from 'react';

import { OpinionsContext } from '../store/opinions-context';
import Submit from './Submit';

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  // form state comes with react 19 and is a way to manage form state
  // without using useState or useReducer

  // shareOpinionAction is an async function that takes the previous state
  // and the form data as arguments. It should return the new state.
  // In this case, it returns an object with errors and enteredValues properties.
  // If there are no errors, errors is null.
  // enteredValues is an object with the form values.
  async function shareOpinionAction(prevState, formData) {
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('Title must be at least five characters long.');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 characters long.');
    }

    if (!userName.trim()) {
      errors.push('Please provide your name.');
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  // input is the written function and the initial state
  // output is the current state and the action to change 
  // formAction is the action that will be called when the form is submitted
  const [formState, ] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}> 
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
