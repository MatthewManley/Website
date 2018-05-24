import { Action, Reducer } from "redux";
import { ActionTypes, SetEmailAction } from "./actions/emailActions";

export interface EmailState {
    email: string | undefined;
}

export const reducer: Reducer<EmailState> = (state: EmailState, incomingAction: Action) => {
    switch (incomingAction.type) {
        case ActionTypes.Set: {
            const action = incomingAction as SetEmailAction;
            return { ...state, email: action.email } as EmailState;
        }
    }
    return state || { email: undefined } as EmailState;
};
