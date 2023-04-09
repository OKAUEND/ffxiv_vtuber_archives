import { useError } from '@/src/hooks/error/useError';

export const Error = () => {
    const [error, _, reset] = useError();

    //エラーが発生していない状態で表示しないようにしておく
    if (!error.hasError) {
        return;
    }

    return (
        <div>
            <h1>{error.status}</h1>
            <div>
                <p>{error.message}</p>
                <p>
                    エラーが発生しました。再度操作を最初からやり直してください。
                </p>
            </div>
        </div>
    );
};
