export enum ActionTypes {
    SetNumber = "SquareRoot: set number",
    Reset = "SquareRoot: reset",
    SetCompact = "SquareRoot: set compact",
}

export interface SetNumberAction {
    type: ActionTypes.SetNumber;
    value: number;
    guess: number;
}

export interface ResetAction {
    type: ActionTypes.Reset;
}

export interface SetCompactAction {
    type: ActionTypes.SetCompact;
    value: boolean;
}

export type KnownAction = SetNumberAction |
    ResetAction |
    SetCompactAction;

export const ActionCreators = {
    Reset: () => (dispatch) => {
        dispatch({ type: ActionTypes.Reset } as ResetAction);
    },
    SetCompact: (value: boolean) => (dispatch) => {
        dispatch({ type: ActionTypes.SetCompact, value } as SetCompactAction);
    },
    SetNumber: (value: number, guess: number) => (dispatch) => {
        dispatch({ type: ActionTypes.SetNumber, value, guess } as SetNumberAction);
    },
};
