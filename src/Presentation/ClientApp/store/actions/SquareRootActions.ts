export enum ActionTypes {
    SetNumber = "SquareRoot: set number",
}

export interface SetNumberAction {
    type: ActionTypes.SetNumber;
    value: number;
    guess: number;
}

export type KnownAction = SetNumberAction;

export const ActionCreators = {
    SetNumber: (value: number, guess: number) => (dispatch) => {
        dispatch({ type: ActionTypes.SetNumber, value, guess } as SetNumberAction);
    },
};
