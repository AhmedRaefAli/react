import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher(); // useFetcher is the tool you should use if you 
  // wanna trigger a loader or an action without actually loading the page,
  // the route to which this action or loader belongs.
  // fetcher give you an object
  //  it gives you another form component
  // which is different from that other form component
  // we used before.
  // It also gives you a submit function
  // which is different from the submit function we got
  // from useSubmit, which we used before.
  /**
   * // So useFetcher is the tool you should use if you
    wanna trigger a loader or an action
    without actually loading the page,
    the route to which this
    action or loader belongs.
   * fetcher give you an object
   * //  it gives you another form component
        which is different from that other form component
        we used before.
        It also gives you a submit function
        which is different from the submit function we got
        from useSubmit, which we used before.
   */

  const { data, state } = fetcher;
  // data is the data returned from the action
  // state is the state of the fetcher
  // it can be idle, loading, submitting, or done
  // idle means the fetcher is idle
  // loading means the fetcher is loading
  // submitting means the fetcher is submitting
  // done means the fetcher is done
  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
