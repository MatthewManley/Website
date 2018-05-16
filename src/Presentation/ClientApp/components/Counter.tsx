import * as React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { ApplicationState } from "../store";
import { actionCreators as counterActionCreators } from "../store/actions/counterActions";

const Counter = ({ count, increment, decrement }) => (
    <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p>Current count: <strong>{count}</strong></p>

        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
);

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.counter, // Selects which state properties are merged into the component's props
    counterActionCreators,                 // Selects which action creators are merged into the component's props
)(Counter);
