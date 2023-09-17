export const useHeader = () => {
  return [
    { text: 'トップ', path: '/', border: false },
    { text: 'サイトについて', path: '/about', border: false },
    { text: 'Sign in', path: '/auth/signin', border: true },
  ];
};
