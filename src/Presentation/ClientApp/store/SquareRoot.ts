import { Action, Reducer } from "redux";
import { ActionTypes, KnownAction } from "./actions/SquareRootActions";

export interface SquareRootState {
    num: number;
    // First value of iterations is the initial guess
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
            for (let i = 0; i++; i < knownAction.iterationCount) {
                iterations.push(GenerateNext(knownAction.value, iterations[i]));
            }
            return { num: knownAction.value, iterations } as SquareRootState;
        }
        case ActionTypes.SetIterationCount: {
            if (knownAction.count < state.iterations.length - 1) {
                // Reduce the number of iterations
                return { ...state, iterations: state.iterations.slice(0, knownAction.count + 1) } as SquareRootState;
            }
            // Increase the number of iterations
            const iterations = [...state.iterations];
            while (iterations.length < knownAction.count + 1) {
                iterations.push(GenerateNext(state.num, iterations[iterations.length - 1]));
            }
            return { ...state, iterations } as SquareRootState;
        }
    }
    return state || { num: InitalRandomNumber(), iterations: [] } as SquareRootState;
};
