import * as SignalR from "@aspnet/signalr";

import { ActionTypes, ServerIncrementCountAction, ServerDecrementCountAction, ServerSetCountAction, GetCountAction } from "../actions/counterActions";

let connection: SignalR.HubConnection;

export const signalRMiddleware = (store) => (next) => (action) => {
    var result = next(action);
    switch (action.type) {
        case ActionTypes.Initialize: {
            connection = new SignalR.HubConnectionBuilder().withUrl("/counterhub").build()
            connection.on("Increment", () => {
                store.dispatch({ type: ActionTypes.ServerIncrement } as ServerIncrementCountAction);
            });
            connection.on("Decrement", () => {
                store.dispatch({ type: ActionTypes.ServerDecrement } as ServerDecrementCountAction);
            });
            connection.on("UpdateCount", (value: number) => {
                store.dispatch({ type: ActionTypes.ServerSet, value} as ServerSetCountAction);
            });
            connection.start().then(() => {
                connection.invoke("Get");
            });
            break;
        }
        case ActionTypes.Increment: {
            connection.invoke("Increment");
            break;
        }
        case ActionTypes.Decrement: {
            connection.invoke("Decrement");
            break;
        }
        case ActionTypes.Get: {
            connection.invoke("Get");
            break;
        }
    }
    return result;
};
