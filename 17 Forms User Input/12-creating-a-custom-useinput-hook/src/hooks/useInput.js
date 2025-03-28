import { useState } from 'react';

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false); // flag to indicate if the input value has been edited

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false); // reset the flag when the input value changes
  }

  function handleInputBlur() {
    setDidEdit(true); // set the flag when the input loses focus
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid // to show error just if user done edit and value is not valid
  };
}
