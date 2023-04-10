import { useRouter } from 'next/router';
import { useError } from '@/src/hooks/error/useError';

export const ErrorNotification = (handleReloadData: () => void) => {
    const [error, _, reset] = useError();
    const router = useRouter();

    //エラーが発生していない状態で表示しないようにしておく
    if (!error.hasError) {
        return;
    }

    //ユーザーがリロードを選択した時は、エラー状態をリセットし、尚且つ親から渡された再度アクセスを行う関数を呼び出す。
    const handleResetError = () => {
        handleReloadData();
        reset();
    };

    //一つ前へ状態を維持しながら戻る実装が難しいため、問答無用でトップページへ戻るようにする
    const handleClickReturnTop = () => {
        router.push('/');
    };

    return (
        <div>
            <h1>{error.status}</h1>
            <div>
                <p>{error.message}</p>
                <p>
                    エラーが発生しました。再度操作を最初からやり直してください。
                </p>
                <button
                    onClick={() => {
                        handleResetError();
                    }}>
                    リロード
                </button>
                <button
                    onClick={() => {
                        handleClickReturnTop();
                    }}>
                    トップページに戻る
                </button>
            </div>
        </div>
    );
};
