// src/http/exception/ResponseException.ts

export class ResponseException extends Error {
    constructor(message: string, public code?: number) {
        super(message);
        this.name = 'ResponseException';
        this.code = code;

        // نگه‌داری stack trace در هنگام ارث‌بری از Error
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
