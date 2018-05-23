import { ServiceResultKinds } from "../../services/";
import * as EmailService from "../../services/EmailService";
import { ActionTypes as EmailActionTypes, GetEmailAction, SetEmailAction } from "../actions/emailActions";

export const emailMiddleware = (store) => (next) => async (action) => {
    const result = next(action);
    switch (action.type) {
        case EmailActionTypes.Get: {
            const response = await EmailService.GetEmail(action.code);
            switch (response.kind) {
                case ServiceResultKinds.success: {
                    store.dispatch({ type: EmailActionTypes.Set, email: response.data } as SetEmailAction);
                    break;
                }
            }
        }
    }
    return result;
};
