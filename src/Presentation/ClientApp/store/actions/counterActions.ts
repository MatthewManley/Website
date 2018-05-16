export enum ActionTypes {
    Increment = "Counter: Increment",
    Decrement = "Counter: Decrement",
}

interface IncrementCountAction { type: ActionTypes.Increment; }
interface DecrementCountAction { type: ActionTypes.Decrement; }

export type KnownAction = IncrementCountAction | DecrementCountAction;

export const actionCreators = {
    decrement: () => (dispatch) => {
        dispatch({ type: ActionTypes.Decrement } as DecrementCountAction);
    },
    increment: () => (dispatch) => {
        dispatch({ type: ActionTypes.Increment } as IncrementCountAction);
    },
};
