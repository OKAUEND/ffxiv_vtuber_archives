export const useTESTHook = async () => {
  const res = await fetch('hogehoge');
  const data = await res.json();
  return data;
};
