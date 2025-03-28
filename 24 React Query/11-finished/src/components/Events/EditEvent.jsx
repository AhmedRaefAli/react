import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();
  const params = useParams();

  // why use useQuery
  // it allow caching and check on data when change tab
  // gives you an object with data and error and isPending and  func like refetch
  // even we use loader down keep this here as we need it for caching 
  const { data, isError, error  } = useQuery({
    queryKey: ['events', params.id], // is the key for caching // must not just event to not be the same like events key which get all data add also search param to keys
    // we wrapped fetch func in func as it takes input
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }), // query function takes fetch func you use 
    staleTime: 10000 // The time in milliseconds after data is considered stale and needs to be refetched
  });

  // optimistic update means update ui right now without wait result from be 
  // and if failed we will return old data
  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     cancel any running query it's a a must 
  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });
  //     get previous data 
  //     const previousEvent = queryClient.getQueryData(['events', params.id]);
          // set the query value with new event 
  //     queryClient.setQueryData(['events', params.id], newEvent);

          // context in onError is what we return here
  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },
  //    onSettled run when mutation completed whatever success or fail 
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id]);
  //   },
  // });

  function handleSubmit(formData) {
    submit(formData, { method: 'PUT' }); // we use submit here with react router action 
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// use react query with react router to fetch data before render page
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}


export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['events']);
  return redirect('../');
}
