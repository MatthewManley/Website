import { polyfill } from "es6-promise";
import * as fetch from "isomorphic-fetch";

import { ServiceError, ServiceResponse, ServiceResult, ServiceResultKinds } from ".";

polyfill();

export const GetAll = async (): Promise<ServiceResponse<string>> => {
    const response: Response = await fetch("./api/email");
    if (response.status !== 200) {
        return { response, kind: ServiceResultKinds.error } as ServiceError;
    }
    const email: string = await response.json();

    return { data: email, kind: ServiceResultKinds.success } as ServiceResult<string>;
};
