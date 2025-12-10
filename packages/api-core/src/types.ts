export type ApiSuccess<T> = {
    ok: true;
    message: string|null;
    data: T;
};

export type ApiFailure<E = any> = {
    ok: false;
    message: string|null;
    errors: E;
};

export type ApiResult<T, E = any> = ApiSuccess<T> | ApiFailure<E>;
