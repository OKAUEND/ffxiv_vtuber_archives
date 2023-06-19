import { createHikasenVtuberData } from '@/channels/__tests__/_mock';

export const useAdminControl = () => {
  //現在のタスクでは仮置きでMockデータを使う
  const data = createHikasenVtuberData('Mock');

  return data;
};
