import { Action, Reducer } from "redux";
import { ActionTypes, RecievedEmailAction, RecievedSiteKeyAction } from "./actions/emailActions";

export interface EmailState {
    email: string | undefined;
    sitekey: string | undefined;
}

export const reducer: Reducer<EmailState> = (state: EmailState, incomingAction: Action) => {
    switch (incomingAction.type) {
        case ActionTypes.Recieved: {
            const action = incomingAction as RecievedEmailAction;
            return { ...state, email: action.email } as EmailState;
        }
        case ActionTypes.RecievedSiteKey: {
            const action = incomingAction as RecievedSiteKeyAction;
            return { ...state, sitekey: action.sitekey } as EmailState;
        }
    }
    return state || { email: "" } as EmailState;
};
