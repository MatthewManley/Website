import { polyfill } from "es6-promise";
import * as fetch from "isomorphic-fetch";
import { GetCookie, SetCookie } from "./CookieService";

import { ServiceError, ServiceResponse, ServiceResult, ServiceResultKinds } from ".";

polyfill();

const GetReferralEmail = async (code: string): Promise<ServiceResponse<string>> => {
    const response: Response = await fetch("./api/referredemail?referral=" + encodeURI(code));
    if (response.status !== 200) {
        return { response, kind: ServiceResultKinds.error } as ServiceError;
    }
    const email = await response.text();
    return { data: email, kind: ServiceResultKinds.success } as ServiceResult<string>;
};

const GetRegularEmail = async (code: string): Promise<ServiceResponse<string>> => {
    const response: Response = await fetch("./api/email?code=" + encodeURI(code));
    if (response.status !== 200) {
        return { response, kind: ServiceResultKinds.error } as ServiceError;
    }
    const email = await response.text();
    return { data: email, kind: ServiceResultKinds.success } as ServiceResult<string>;
};

export const GetEmail = async (code: string | undefined = undefined): Promise<ServiceResponse<string>> => {
    const email: string | undefined = GetCookie("email");

    if (email !== undefined) {
        return { data: email, kind: ServiceResultKinds.success } as ServiceResult<string>;
    }

    const referrer: string | undefined = GetCookie("referrer");
    if (referrer) {
        const referralResponse = await GetReferralEmail(referrer);
        if (referralResponse.kind === ServiceResultKinds.success) {
            SetCookie("email", referralResponse.data);
            return referralResponse;
        }
    }

    if (code === undefined) {
        return { response: "Email not found in storage and code not provided", kind: ServiceResultKinds.error } as ServiceError;
    }
    const regularResponse = await GetRegularEmail(code);
    if (regularResponse.kind === ServiceResultKinds.success) {
        SetCookie("email", regularResponse.data);
    }
    return regularResponse;
};
