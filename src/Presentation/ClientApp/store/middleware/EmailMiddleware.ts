import { ServiceResultKinds } from "../../services/";
import * as EmailService from "../../services/EmailService";
import { ActionTypes as EmailActionTypes, GetEmailAction, RecievedEmailAction, RecievedSiteKeyAction } from "../actions/emailActions";

export const emailMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case EmailActionTypes.Get: {
            const response = await EmailService.GetEmail(action.code);
            switch (response.kind) {
                case ServiceResultKinds.success: {
                    store.dispatch({ type: EmailActionTypes.Recieved, email: response.data } as RecievedEmailAction);
                    break;
                }
                case ServiceResultKinds.error: {
                    // Todo: throw an error
                    break;
                }
                default:
                    throw new TypeError();
            }
        }
        case EmailActionTypes.GetSiteKey: {
            const response = await EmailService.GetSiteKey();
            switch (response.kind) {
                case ServiceResultKinds.success: {
                    store.dispatch({ type: EmailActionTypes.RecievedSiteKey, sitekey: response.data } as RecievedSiteKeyAction);
                    break;
                }
                case ServiceResultKinds.error: {
                    // Todo: throw an error
                    break;
                }
                default:
                    throw new TypeError();
            }
        }
    }
    return next(action);
};
