import { AppThunkAction } from "..";

export enum ActionTypes {
    Increment = "Counter: Increment",
    Decrement = "Counter: Decrement",
    Initialize = "Counter: Initialize",
    Get = "Counter: Get",

    // Server Actions only dispatched by signalR Middleware
    ServerSet = "Counter: Server Set",
    ServerIncrement = "Counter: Server Increment",
    ServerDecrement = "Counter: Server Decrement",
}

export interface IncrementCountAction { type: ActionTypes.Increment; }
export interface DecrementCountAction { type: ActionTypes.Decrement; }
export interface InitializeCountAction { type: ActionTypes.Initialize; }
export interface GetCountAction { type: ActionTypes.Get; }

// Server Actions only dispatched by signalR middleware
export interface ServerSetCountAction { type: ActionTypes.ServerSet; value: number; }
export interface ServerIncrementCountAction { type: ActionTypes.ServerIncrement; }
export interface ServerDecrementCountAction { type: ActionTypes.ServerDecrement }

export type KnownAction = IncrementCountAction |
    DecrementCountAction | 
    InitializeCountAction |
    GetCountAction |
    ServerSetCountAction |
    ServerIncrementCountAction |
    ServerDecrementCountAction;

export const actionCreators = {
    decrement: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: ActionTypes.Decrement } as DecrementCountAction);
    },
    increment: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: ActionTypes.Increment } as IncrementCountAction);
    },
    Initialize: ():AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: ActionTypes.Initialize } as InitializeCountAction);
    },
    get: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: ActionTypes.Get } as GetCountAction);
    },
};
