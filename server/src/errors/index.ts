import { ValidationError } from "express-validator";

type Errors = ValidationError[] | string[];

export class ApiError extends Error {
    status: number;
    message: string;
    errors: Errors;

    constructor(status: number, message: string, errors: Errors = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static UnauthorizedError(){
        return new ApiError(401, 'The user is not authorized');
    }

    static BadRequest(message: string, errors: Errors = []) {
        return new ApiError(400, message, errors);
    }

    static ValidationError(errors: Errors) {
        return new ApiError(400, 'Validation error', errors);
    }

    static NotFound() {
        return new ApiError(404, 'Not found');
    }
}
