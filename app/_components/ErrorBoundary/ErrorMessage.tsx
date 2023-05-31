'use client';

import { useErrorState } from './hook/useErrorState';
import { FallBackProps, CallBackProps } from './type/ErrorMessage';

/**
 * エラーコードによってメッセージを表示させる
 * @param status
 * @returns
 */
const ErrorMessage = ({ message }: FallBackProps) => {
  const show = useErrorState(message);
  return (
    <section>
      <h1>{status}</h1>
      <span>{show.message}</span>
      <span>{show.subMessage}</span>
    </section>
  );
};

/**
 * ErrorMessageを表示させるためのラッパーコンポーネント
 * @param status
 * @returns
 */
export const ErrorBoundaryFallBack = ({ message }: FallBackProps) => {
  return (
    <>
      <ErrorMessage message={status} />
    </>
  );
};
