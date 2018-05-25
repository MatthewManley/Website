import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { BoundSelectANumber } from "./SelectANumber";
import { SqrtSteps } from "./ShowSteps";

const SquareRoots = ({ num, guess, iterations, compact }) => {
    if (iterations.length === 0) {
        return <BoundSelectANumber />;
    }
    return (
        <div className="fake-section">
            <div>
                {num}
            </div>
            <SqrtSteps num={num} guess={guess} iterations={iterations} compact={compact} />
        </div>
    );
};

export const BoundSquareRoots = connect(
    (state: ApplicationState) => (state.squareRoot),
)(SquareRoots);
