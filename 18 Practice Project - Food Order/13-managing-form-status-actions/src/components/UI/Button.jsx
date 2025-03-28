export default function Button({ children, textOnly, className, ...props }) { // group props in a single object
  // dynamic classnames
  let cssClasses = textOnly ? 'text-button' : 'button';
  cssClasses += ' ' + className;

  return (
    <button className={cssClasses} {...props}> { /*spread operator to pass all props*/}
      {children}
    </button>
  );
}
