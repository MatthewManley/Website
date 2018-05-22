export enum ActionTypes {
    Get = "Email: get",
    Recieved = "Email: recieved",
    GetSiteKey = "Email: get site key",
    RecievedSiteKey = "Email: recieved site key",
}

export interface GetEmailAction {
    type: ActionTypes.Get;
    code: string;
}

export interface RecievedEmailAction {
    type: ActionTypes.Recieved;
    email: string;
}

export interface GetSiteKeyAction {
    type: ActionTypes.GetSiteKey;
}

export interface RecievedSiteKeyAction {
    type: ActionTypes.RecievedSiteKey;
    sitekey: string;
}

export const ActionCreators = {
    GetEmail: (code) => (dispatch) => {
        dispatch({ type: ActionTypes.Get, code } as GetEmailAction);
    },
    GetSiteKey: () => (dispatch) => {
        dispatch({type: ActionTypes.GetSiteKey} as GetSiteKeyAction);
    },
};
