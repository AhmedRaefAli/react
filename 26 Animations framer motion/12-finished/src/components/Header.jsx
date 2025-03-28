import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

/**
 * Header component that displays a header with a button to add a new challenge.
 * 
 * The button scales up when hovered over, using a spring animation with a stiffness of 500.
 * When the button is clicked, it triggers the creation of a new challenge.
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence> {/** 
       * // any component shown conditionally and has an animate must be wrapped 
       * with this <AnimatePresence></AnimatePresence> to tell react to play animation before remove it from dom
       */}
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }} // scale button when hover 
          transition={{ type: 'spring', stiffness: 500 }} // using a spring animation with a stiffness of 500.
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
