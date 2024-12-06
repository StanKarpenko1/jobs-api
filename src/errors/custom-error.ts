

export interface CustomErrorType extends Error {
    statusCode: number;
}

export class CustomError extends Error implements CustomErrorType { 
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const createCustomError = (msg: string, statusCode: number): CustomError => {
    return new CustomError(msg, statusCode);
};

