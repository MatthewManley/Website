import { ActionCreator } from "react-redux";

export enum ActionTypes {
    SetNumber = "SquareRoot: set number",
    IncrementIterations = "SquareRoot: increment iteractions",
    DecrementIterations = "SquareRoot: decrement iteractions",
}

export interface SetNumberAction {
    type: ActionTypes.SetNumber;
    value: number;
    guess: number;
    numIterations: number;
}

export interface IncrementIterationAction {
    type: ActionTypes.IncrementIterations;
    by: number;
}

export interface DecrementIterationAction {
    type: ActionTypes.DecrementIterations;
    by: number;
}

export type KnownAction = SetNumberAction |
    IncrementIterationAction |
    DecrementIterationAction;

export const ActionCreators = {
    DecrementIteration: (by: number = 1) => (dispatch) => {
        dispatch({ type: ActionTypes.DecrementIterations, by } as DecrementIterationAction);
    },
    IncrementIteration: (by: number = 1) => (dispatch) => {
        dispatch({ type: ActionTypes.IncrementIterations, by } as IncrementIterationAction);
    },
    SetNumber: (value: number) => (dispatch) => {
        dispatch({ type: ActionTypes.SetNumber, value } as SetNumberAction);
    },
};
