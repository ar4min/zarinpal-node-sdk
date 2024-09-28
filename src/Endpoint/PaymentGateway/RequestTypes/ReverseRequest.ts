// src/endpoint/paymentGateway/requestTypes/ReverseRequest.ts

import { Fillable } from '../../Fillable';

export class ReverseRequest extends Fillable(class {}) {
    public merchantId?: string = undefined;
    public authority: string = '';

    constructor(inputs: Partial<ReverseRequest> = {}) {
        super();
        this.fill(inputs);
    }

    // اعتبارسنجی داده‌ها
    public validate(): void {
        this.validateMerchantId();
        this.validateAuthority();
    }

    private validateMerchantId(): void {
        const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
        if (!this.merchantId || !uuidRegex.test(this.merchantId)) {
            throw new Error('Invalid merchant_id format. It should be a valid UUID.');
        }
    }

    private validateAuthority(): void {
        const authorityRegex = /^A[0-9a-zA-Z]{35}$/;
        if (!authorityRegex.test(this.authority)) {
            throw new Error('Invalid authority format. It should be a string starting with "A" followed by 35 alphanumeric characters.');
        }
    }

    // تبدیل به رشته JSON
    public toString(): string {
        this.validate();

        return JSON.stringify({
            merchant_id: this.merchantId,
            authority: this.authority,
        });
    }
}
