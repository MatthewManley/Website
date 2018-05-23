import { Action, Reducer } from "redux";
import { ActionTypes, KnownAction } from "./actions/SquareRootActions";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SquareRootState {
    value: number | null;
    iteration: number | null;
    guess: number | null;
    answer: number | null;
    previousAnswer: SquareRootState | null;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<SquareRootState> = (state: SquareRootState, action: KnownAction) => {
    switch (action.type) {
        case ActionTypes.SetNumber: {
            let guess = action.guess;
            if (guess === null) {
                const sqrt = Math.sqrt(action.value);
                const guess1 = Math.floor(sqrt);
                const guess2 = Math.ceil(sqrt);
                const difference1 = Math.abs(sqrt - guess1);
                const difference2 = Math.abs(sqrt - guess2);
                guess = (difference2 < difference1) ? guess2 : guess1;
            }

                return { value: action.value, iteration: 1 } as SquareRootState;
        }
        case ActionTypes.IncrementIterations: {
            return { ...state, iteration: state.iteration + 1 };
        }
        case ActionTypes.DecrementIterations: {
            if (state.iteration <= 1) {
                return { ...state, iteration: 1 };
            }
            return { ...state, iteration: state.iteration - 1 } as SquareRootState;
        }

    }
    return state || { value: null, iteration: 1 };
};
