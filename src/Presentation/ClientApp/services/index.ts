export enum ServiceResultKinds {
    error = "ERROR",
    success = "SUCCESS",
}

export interface ServiceError {
    response: Response | string;
    kind: ServiceResultKinds.error;
}

export interface ServiceResult<T> {
    data: T;
    kind: ServiceResultKinds.success;
}

export type ServiceResponse<T> = ServiceError | ServiceResult<T>;
