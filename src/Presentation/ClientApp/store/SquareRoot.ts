import { Action, Reducer } from "redux";
import { ActionTypes, KnownAction } from "./actions/SquareRootActions";

export interface SquareRootState {
    num: number;
    guess: number;
    iterations: number[];
    compact: boolean;
}

// One step of babylonian square root algorithm
const GenerateNext = (value, guess) => {
    return ((value / guess) + guess) / 2;
};

// Returns a whole number near the actual square root.
export const InitialGuess = (num: number) => {
    const sqrt = Math.sqrt(num);
    const guess1 = Math.floor(sqrt);
    const guess2 = Math.ceil(sqrt);
    if (sqrt === guess1) {
        return guess1 + 1;
    }
    return (sqrt - guess1 < guess2 - sqrt) ? guess1 : guess2;
};

// Generates a random number between 10 and 100 to two decimal places
const InitalRandomNumber = () => {
    return Math.floor((Math.random() * 10000) * 100) / 100;
};

export const reducer: Reducer<SquareRootState> = (state: SquareRootState, action: Action) => {
    const knownAction = action as KnownAction;
    switch (knownAction.type) {
        case ActionTypes.SetNumber: {
            const iterations: number[] = [knownAction.guess];
            iterations.push(GenerateNext(knownAction.value, iterations[0]));
            while (iterations[iterations.length - 1] !== iterations[iterations.length - 2]) {
                iterations.push(GenerateNext(knownAction.value, iterations[iterations.length - 1]));
            }
            return { num: knownAction.value, guess: knownAction.guess, iterations, compact: false } as SquareRootState;
        }
    }
    const num = InitalRandomNumber();
    return state || { num, guess: InitialGuess(num), iterations: [], compact: false } as SquareRootState;
};
