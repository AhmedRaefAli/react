import { useState, useEffect } from 'react';

export default function Meals() {

  // we use state here as data will be fetched from the server and will take some time to load
  // and we want to update ui when it is loaded
  const [loadedMeals, setLoadedMeals] = useState([]);


  // useEffect is used to run side effects in function components
  // we must use useEffect to fetch data from server as it is a side effect
  // and to avoid infinite loop we must pass an empty array as second argument
  // when data comes from server, setLoadedMeals will be called and component will re-render
  // so we use useEffect to fetch data from server and update state and use eFFect makes sure that
  // it runs only once when component is mounted as dependent array is empty
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
        // ...
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
