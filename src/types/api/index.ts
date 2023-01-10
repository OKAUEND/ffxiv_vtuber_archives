export type Data<T> = {
    status: number;
    message?: string;
    item?: T;
    error?: boolean;
};
