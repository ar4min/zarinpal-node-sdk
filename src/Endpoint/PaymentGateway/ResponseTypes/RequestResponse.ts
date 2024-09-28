// src/endpoint/paymentGateway/responseTypes/RequestResponse.ts

import { Fillable } from '../../Fillable';

// اعمال mixin برای اضافه کردن رفتارهای Fillable
export class RequestResponse extends Fillable(class {}) {
    public authority: string = '';
    public code: number = 0;
    public message: string = '';
    public fee_type: string = '';
    public fee: number = 0;
    public amount: number = 0;
    public status: string = '';

    constructor(inputs: Partial<RequestResponse> = {}) {
        super(); // فراخوانی سازنده‌ی Fillable
        this.fill(inputs); // پر کردن ویژگی‌ها از ورودی‌ها
    }
}
