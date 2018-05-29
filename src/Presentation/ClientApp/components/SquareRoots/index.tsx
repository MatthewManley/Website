import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { BoundSelectANumber } from "./SelectANumber";
import { BoundShowSteps } from "./ShowSteps";

const SquareRoots = ({ num, guess, iterations, compact }) => {
    if (iterations.length === 0) {
        return <BoundSelectANumber />;
    }
    return (
        <BoundShowSteps />
    );
};

export const BoundSquareRoots = connect(
    (state: ApplicationState) => (state.squareRoot),
)(SquareRoots);
