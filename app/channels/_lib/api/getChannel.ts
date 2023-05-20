export const getChannel = async (offset: string) => {
  const BASE_QUERY_COUNT = 20;
  const query =
    Number(offset) === 1
      ? ''
      : `?offset=${BASE_QUERY_COUNT * (Number(offset) - 1)}&limit=20`;
  const URL = `https://pokeapi.co/api/v2/pokemon/${query}`;
  const res = await fetch(URL);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
