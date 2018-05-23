import { polyfill } from "es6-promise";
import * as fetch from "isomorphic-fetch";
import { GetCookie, SetCookie } from "./CookieService";

import { ServiceError, ServiceResponse, ServiceResult, ServiceResultKinds } from ".";

polyfill();

export const GetEmail = async (code: string | null = null): Promise<ServiceResponse<string>> => {
    let email: string | null = GetCookie("email");

    if (email !== null) {
        return { data: email, kind: ServiceResultKinds.success } as ServiceResult<string>;
    }

    if (code === null) {
        return { response: "Email not found in storage and code not provided", kind: ServiceResultKinds.error } as ServiceError;
    }

    const response: Response = await fetch("./api/email?code=" + encodeURI(code));
    if (response.status !== 200) {
        return { response, kind: ServiceResultKinds.error } as ServiceError;
    }
    email = await response.text();
    SetCookie("email", email);
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
