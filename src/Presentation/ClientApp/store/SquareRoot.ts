import { Action, Reducer } from "redux";
import { ActionTypes, KnownAction } from "./actions/SquareRootActions";

export interface SquareRootState {
    num: number;
    currentIteration: number;
    iterations: number[];
}

const GenerateNext = (value, guess) => {
    return ((value / guess) + guess) / 2;
};

// Generates a random number between 10 and 100 to two decimal places
const InitalRandomNumber = () => {
    return Math.floor((Math.random() * 90 + 10) * 100) / 100;
};

export const reducer: Reducer<SquareRootState> = (state: SquareRootState, action: Action) => {
    const knownAction = action as KnownAction;
    switch (knownAction.type) {
        case ActionTypes.SetNumber: {
                const iterations: number[] = [knownAction.guess];
                for (let i = 0; i++; i < knownAction.numIterations) {
                    iterations.push(GenerateNext(knownAction.value, iterations[i]));
                }
                return { num: knownAction.value, currentIteration: knownAction.numIterations, iterations } as SquareRootState;
        }
        case ActionTypes.IncrementIterations: {
            const currentIteration = state.currentIteration + knownAction.by;
            const iterations = [...state.iterations];
            while (iterations.length < currentIteration) {
                iterations.push(GenerateNext(state.num, iterations[iterations.length - 1]));
            }
            return { ...state, currentIteration, iterations } as SquareRootState;
        }
        case ActionTypes.DecrementIterations: {
            const currentIteration = Math.max(state.currentIteration - knownAction.by, 1);
            return { ...state, currentIteration  } as SquareRootState;
        }

    }
    return state || { num: InitalRandomNumber(), currentIteration: 0, iterations: [] } as SquareRootState;
};
