import * as SignalR from "@aspnet/signalr";

import { ActionTypes, ServerIncrementCountAction, ServerDecrementCountAction, ServerSetCountAction, GetCountAction } from "../actions/counterActions";

let connection: SignalR.HubConnection;
let room: string;

export const signalRMiddleware = (store) => (next) => (action) => {
    var result = next(action);
    switch (action.type) {
        case ActionTypes.Initialize: {
            room = action.room || "";
            connection = new SignalR.HubConnectionBuilder()
                .withUrl("/counterhub")
                .configureLogging(SignalR.LogLevel.None)
                .build();
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
                connection.invoke("Join", room).catch(err => console.error(err.toString()));
            }).catch(err => console.error(err.toString()));
            break;
        }
        case ActionTypes.Increment: {
            connection.invoke("Increment", room).catch(err => console.error(err.toString()));
            break;
        }
        case ActionTypes.Decrement: {
            connection.invoke("Decrement", room).catch(err => console.error(err.toString()));
            break;
        }
        case ActionTypes.Get: {
            connection.invoke("Get", room).catch(err => console.error(err.toString()));
            break;
        }
    }
    return result;
};
