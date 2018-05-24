import { ActionCreator } from "react-redux";

export enum ActionTypes {
    SetNumber = "SquareRoot: set number",
    SetIterationCount = "SquareRoot: set iteration count",
}

export interface SetNumberAction {
    type: ActionTypes.SetNumber;
    value: number;
    guess: number;
    iterationCount: number;
}

export interface SetIterationCountAction {
    type: ActionTypes.SetIterationCount;
    count: number;
}

export type KnownAction = SetNumberAction |
    SetIterationCountAction;

export const ActionCreators = {
    SetIterationCount: (count: number) => (dispatch) => {
        dispatch({ type: ActionTypes.SetIterationCount, count } as SetIterationCountAction);
    } ,
    SetNumber: (value: number, guess: number, iterationCount: number) => (dispatch) => {
        dispatch({ type: ActionTypes.SetNumber, value, guess, iterationCount } as SetNumberAction);
    },
};
