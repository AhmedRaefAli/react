import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
	const [isFetching, setIsFetching] = useState();
	const [error, setError] = useState();
	const [fetchedData, setFetchedData] = useState(initialValue);

	//name convention must start with use to make react recognize it as a custom hook
	useEffect(() => {
		// you cant make the cb function inside use effect async
		// as async function return promise
		// but useEffect must return no thing or clean uo function
		// so the solution is to add a function inside it and call it inside
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFn();
				setFetchedData(data);
			} catch (error) {
				setError({ message: error.message || 'Failed to fetch data.' });
			}

			setIsFetching(false);
		}

		fetchData();
	}, [fetchFn]);

	return {
		isFetching,
		fetchedData,
		setFetchedData,
		error,
	};
}