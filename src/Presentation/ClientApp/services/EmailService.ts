import { polyfill } from "es6-promise";
import * as fetch from "isomorphic-fetch";

import { ServiceError, ServiceResponse, ServiceResult, ServiceResultKinds } from ".";

polyfill();

export const GetEmail = async (code: string): Promise<ServiceResponse<string>> => {

    const response: Response = await fetch("./api/email?code=" + encodeURI(code));
    if (response.status !== 200) {
        return { response, kind: ServiceResultKinds.error } as ServiceError;
    }
    const email = await response.text();
    return { data: email, kind: ServiceResultKinds.success } as ServiceResult<string>;
};

export const GetSiteKey = async (): Promise<ServiceResponse<string>> => {
    const response: Response = await fetch("./api/sitekey");
    if (response.status !== 200) {
        return { response, kind: ServiceResultKinds.error } as ServiceError;
    }
    const siteKey = await response.text();
    return { data: siteKey, kind: ServiceResultKinds.success } as ServiceResult<string>;
};
