export enum ResponseCodes {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICTED = 409,
    INTERNAL_SERVER_ERROR = 500,
    SUCCESS = 200
}

export enum ResponseMsgs {
    UNAUTHORIZED = "Unauthorized access.",
    BAD_REQUEST = "Bad request.",
    NOT_FOUND = "Not found.",
    CONFLICTED = "Conflicted.",
    INTERNAL_SERVER_ERROR = "Internal server error.",
    SUCCESS = "Success"
}

export interface ResponseData<T> {
    StatusMsg: string;
    StatusCode: ResponseCodes;
    Data?: T;
}

export function SuccessResponse<T>(
    data?: T,
    message?: string
): ResponseData<T> {
    return {
        StatusMsg: message ?? ResponseMsgs.SUCCESS,
        StatusCode: ResponseCodes.SUCCESS,
        Data: data ?? undefined
    };
}

export function NotFoundResponse<T>(
    data?: T,
    message?: string
): ResponseData<T> {
    return {
        StatusMsg: message ?? ResponseMsgs.NOT_FOUND,
        StatusCode: ResponseCodes.NOT_FOUND,
        Data: data ?? undefined
    };
}

export function InternalErrorResponse<T>(
    data?: T,
    message?: string
): ResponseData<T> {
    return {
        StatusMsg: message ?? ResponseMsgs.INTERNAL_SERVER_ERROR,
        StatusCode: ResponseCodes.INTERNAL_SERVER_ERROR,
        Data: data ?? undefined
    };
}

export function BadRequestResponse<T>(
    data?: T,
    message?: string
): ResponseData<T> {
    return {
        StatusMsg: message ?? ResponseMsgs.BAD_REQUEST,
        StatusCode: ResponseCodes.BAD_REQUEST,
        Data: data ?? undefined
    };
}

export function UnauthorizedResponse<T>(
    data?: T,
    message?: string
): ResponseData<T> {
    return {
        StatusMsg: message ?? ResponseMsgs.UNAUTHORIZED,
        StatusCode: ResponseCodes.UNAUTHORIZED,
        Data: data ?? undefined
    };
}
