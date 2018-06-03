import { Reducer } from "redux";
import { ActionTypes, KnownAction } from "./actions/counterActions";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface CounterState {
    count: number;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<CounterState> = (state: CounterState, action: KnownAction) => {
    switch (action.type) {
        case ActionTypes.ServerIncrement:
        case ActionTypes.Increment:
            return { count: state.count + 1 } as CounterState;
        case ActionTypes.ServerDecrement:
        case ActionTypes.Decrement:
            return { count: state.count - 1 } as CounterState;
        case ActionTypes.ServerSet:
            return { count: action.value } as CounterState;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0 };
};
