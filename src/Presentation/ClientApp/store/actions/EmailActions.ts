export enum ActionTypes {
    Get = "Email: get",
    Set = "Email: set",
}

export interface GetEmailAction {
    type: ActionTypes.Get;
    code: string | undefined;
}

export interface SetEmailAction {
    type: ActionTypes.Set;
    email: string;
}

export const ActionCreators = {
    GetEmail: (code: string | undefined = undefined) => (dispatch) => {
        dispatch({ type: ActionTypes.Get, code } as GetEmailAction);
    },
    SetEmail: (email: string) => (dispatch) => {
        dispatch({ type: ActionTypes.Set, email } as SetEmailAction);
    },
};
