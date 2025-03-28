import { motion } from 'framer-motion';

import Badge from './Badge.jsx';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        {
          // But in React, even if you're not using Framer Motion,
          // keys also have another purpose.
          // When you add them on an element
          // and you then change the value that's assigned to the key.
          // For example, because of some state change,
          // React will basically destroy the old component instance
          // and render a new one instead.
          // So you can add that key prop to any component of your choice
          // and change that value then to get React
          // to recreate that component.
          // And that will reset any internal state
          // stored in that component,
          //Therefore, the key will change
          // whenever the number of items in a list changes,
          // and the badge will be recreated
          // and the entry animation will be played again.
          // That's how we're using this key to get Framer Motion
          // to play that animation again.
        }
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {isSelected && <motion.div layoutId="tab-indicator" className="active-tab-indicator" />} {
        // by just add layoutId =  id this tells when y change tab with same id 
        // it trigger a good animation when change the tab 
      }
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
