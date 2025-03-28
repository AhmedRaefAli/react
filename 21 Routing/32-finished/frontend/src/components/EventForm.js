import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData(); // get action data response
  const navigate = useNavigate(); // used to navigate progrmaticly with button click etc ...
  const navigation = useNavigation(); // useNavigation get data fetching state 

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');// go up one level in routes
  }

  return (
    /* //Form from react router dom lib to auto matic trigger action*/
    <Form method={method} /** // you can set prop action='/some path to trigger this path action'*/ className={classes.form}> 
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {//reusable action for create and update 
  const method = request.method;
  const data = await request.formData(); // get form data

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) { // this validation status response so we return the response
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save event.' }), {
      status: 500,
    });
    // throw json { message: 'Could not save event.' }), {
      // status: 500}); no need to stringify
  }

  return redirect('/events'); // redirect to events page
}

