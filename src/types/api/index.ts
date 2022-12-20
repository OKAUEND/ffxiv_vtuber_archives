export type Data<T> = {
    status: number;
    message?: string;
    channels?: T;
};
