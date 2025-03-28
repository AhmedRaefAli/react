import { useFormStatus } from 'react-dom';

export default function Submit() {
  // pending is a boolean that is true when the form is being submitted
  // useFormStatus is a hook that returns the form status
  // it is used to disable the submit button when the form is being submitted
  // and to show a message to the user
  // cant be used outside of a form must in nested component in form 
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
       {pending ? 'Submitting...' : 'Submit'} 
      </button>
    </p>
  );
}
