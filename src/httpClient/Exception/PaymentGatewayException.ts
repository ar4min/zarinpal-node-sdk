// src/http/exception/PaymentGatewayException.ts

// کلاس پایه برای ResponseException (فرض می‌شود که باید جداگانه پیاده‌سازی شود)
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

export class PaymentGatewayException extends ResponseException {
    private validationErrors: any[] | null;

    constructor(errors: { validations?: any[]; message: string; code: number }) {
        super(errors.message, errors.code);
        this.validationErrors = errors.validations || null;
    }

    public getValidationErrors(): any[] | null {
        return this.validationErrors;
    }
}
