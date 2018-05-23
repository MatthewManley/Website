export enum ActionTypes {
    SetNumber = "SquareRoot: set number",
    IncrementIterations = "SquareRoot: increment iteractions",
    DecrementIterations = "SquareRoot: decrement iteractions",
}

export interface SetNumberAction {
    type: ActionTypes.SetNumber;
    value: number;
    guess: number | null;
}

export interface IncrementIterationAction {
    type: ActionTypes.IncrementIterations;
}

export interface DecrementIterationAction {
    type: ActionTypes.DecrementIterations;
}

export type KnownAction = SetNumberAction |
    IncrementIterationAction |
    DecrementIterationAction;

export const ActionCreators = {
    DecrementIteration: () => (dispatch) => {
        dispatch({type: ActionTypes.DecrementIterations} as DecrementIterationAction);
    },
    IncrementIteration: () => (dispatch) => {
        dispatch({type: ActionTypes.IncrementIterations} as IncrementIterationAction);
    },
    SetNumber: (value: number) => (dispatch) => {
        dispatch({ type: ActionTypes.SetNumber, value } as SetNumberAction);
    },
};
