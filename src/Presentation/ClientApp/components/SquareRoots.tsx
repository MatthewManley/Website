import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers, withState, withProps } from "recompose";
import { ApplicationState } from "../store";
import { ActionCreators as SquareRootActions } from "../store/actions/SquareRootActions";

const SelectANumber = ({ num, guess, numOnChange, guessOnChange, autoGuess, autoGuessOnChange }) => (
    <div className="fake-section">
        <div>
            <p>Enter a number that you want to find the square root of:</p>
            <input type="number" value={num} onChange={numOnChange} />
        </div>
        <div>
            <p>Enter a guess for the square root: </p>
            <input type="number" value={guess} onChange={guessOnChange} disabled={autoGuess} />
        </div>
        <div>
            Guess for me
            <input type="checkbox" checked={autoGuess} onChange={autoGuessOnChange} />
        </div>
        <br />
        <button className="btn">Calculate Square Root</button>
    </div>
);

const BoundSelectANumber = compose<any, any>(
    withState("inputNumber", "updateInputNumber", 0),
    withProps({
        autoGuess: false,
    }),
    lifecycle({
        componentWillMount() {
            const props: any = this.props;
            props.updateInputNumber(props.num);
        },
    }),
    withHandlers({
        onClick: ({ inputNumber, SetNumber, IncrementIteration }: any) => (event) => {
            SetNumber(inputNumber);
            IncrementIteration();
        },
        onUpdate: ({ updateInputNumber }: any) => (event) => {
            updateInputNumber(event.target.value);
        },
    }),
)(SelectANumber);

const SquareRoots = ({ currentIteration, num }) => {
    if (currentIteration === 0) {
        return (<BoundSelectANumber num={num} />);
    }
    return (
        <>test</>
    );
};

const binder = compose<any, any>(
    connect(
        (state: ApplicationState) => (state.squareRoot),
        SquareRootActions,
    ),
);

export const BoundSquareRoots = binder(SquareRoots);

const SqrtStep = ({ iteration, value, guess, actual }) => {
    const step2 = value / guess;
    const step3 = (guess + step2) / 2;
    return (
        <>
            <h5>Iteration {iteration}</h5>
            <p>Step 1 - Guess: {guess}</p>
            <p>Step 2 - Divide {value} by {guess} = {step2}</p>
            <p>Step 3 - Find average of {guess} and {step2} = {step3} (because ({guess} + {step2})/2 = {step3}</p>
            <p>Step 4 - Start over with a guess of {step3}</p>
        </>
    );
};
