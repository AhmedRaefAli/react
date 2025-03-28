import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';
import { action } from './EventForm';

function EventItem({ event }) {
  const submit = useSubmit(); // useSubmit hook to submit data to server

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) { // null can be replaced with body data to send to server
      submit(null, { method: 'delete' , /* // if in diff path wanted action action:'/events/'+event.id*/ }); 
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link> {/** // link is used not <a href ></a> as <a>cause a reload to page but link prevent this behavior and check the defined routes
         * note that <Link render <a> element i u wanna css it use .list a normally 
          */}
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
