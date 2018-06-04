import * as React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import { ApplicationState } from "../store";
import { actionCreators as counterActionCreators } from "../store/actions/counterActions";
import * as SignalR from "@aspnet/signalr";

const Counter = ({ count, increment, decrement }) => (
    <div>
        <h1>Counter</h1>

        <p>Open this page in another browser or on another device.</p>

        <p>Current count: <strong>{count}</strong></p>

        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
);

export default compose<{ count, increment, decrement }, {}>(
    connect(
        (state: ApplicationState) => state.counter, // Selects which state properties are merged into the component's props
        counterActionCreators,                 // Selects which action creators are merged into the component's props
    ),
    lifecycle({
        componentWillMount() {
            var props: any = this.props;
            props.Initialize(props.match.params.room);
        }
    })
)(Counter);
