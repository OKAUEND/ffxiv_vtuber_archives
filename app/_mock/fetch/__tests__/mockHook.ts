export const useTESTHook = async () => {
  const res = await fetch('hogehoge');
  if (!res.ok) {
    throw new Error('Error');
  }
  const data = await res.json();
  return data;
};
