import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  // useMutation to Post Req
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => { // function called after mutation success 
      queryClient.invalidateQueries({ queryKey: ['events'] }); // tels react-query that query with this key now invalid 
      // as we create new Event and want to immediate reFetch data to show also new Event
      // it also invalid the queries with events and search param which is good too
      // if need to stop that { queryKey: ['events']  , exact : true}
      navigate('/events');
    },
  });

  // we use mutate here with useMutation
  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {
        // nice error 
      }
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}
