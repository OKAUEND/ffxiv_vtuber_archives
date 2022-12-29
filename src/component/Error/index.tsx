export const Error = ({
    status,
    message,
}: {
    status: number;
    message: string;
}) => {
    return (
        <div>
            <h1>{status}</h1>
            <div>
                <p>{message}</p>
                <p>
                    エラーが発生しました。再度操作を最初からやり直してください。
                </p>
            </div>
        </div>
    );
};
