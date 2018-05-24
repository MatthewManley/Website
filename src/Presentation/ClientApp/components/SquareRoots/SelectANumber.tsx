import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers, withProps, withState } from "recompose";
import { ApplicationState } from "../../store";
import { ActionCreators as SquareRootActions } from "../../store/actions/SquareRootActions";

// Returns a whole number near the actual square root.
const InitialGuess = (num: number) => {
    const sqrt = Math.sqrt(num);
    const guess1 = Math.floor(sqrt);
    const guess2 = Math.ceil(sqrt);
    if (sqrt === guess1) {
        return guess1 + 1;
    }
    return (sqrt - guess1 < guess2 - sqrt) ? guess1 : guess2;
};

const SelectANumber = ({ inputNumber, onUpdateInputNumber, guess, onUpdateGuess, autoGuess, onUpdateAutoGuess, inputIterationCount, onUpdateInputIterationCount, onCalculateSqrt }) => (
    <div className="fake-section">
        <div>
            <p>Enter a number that you want to find the square root of:</p>
            <input type="number" value={inputNumber} onChange={onUpdateInputNumber} />
        </div>
        <div>
            <p>Enter a guess for the square root: </p>
            <input type="number" value={guess} onChange={onUpdateGuess} disabled={autoGuess} />
        </div>
        <div>
            Guess for me
            <input type="checkbox" checked={autoGuess} onChange={onUpdateAutoGuess} />
        </div>
        <div>
            <p>Enter number of iterations: </p>
            <input type="number" value={inputIterationCount} onChange={onUpdateInputIterationCount} />
        </div>
        <br />
        <button className="btn" onClick={onCalculateSqrt}>Calculate Square Root</button>
    </div>
);

export const BoundSelectANumber = compose<any, any>(
    connect(
        (state: ApplicationState) => ({ num: state.squareRoot.num }),
        SquareRootActions,
    ),
    withState("autoGuess", "updateAutoGuess", false),
    withState("inputNumber", "updateInputNumber", 0),
    withState("guess", "updateGuess", 0),
    withState("inputIterationCount", "updateInputIterationCount", 10),
    lifecycle({
        componentWillMount() {
            const props: any = this.props;
            const { num, updateInputNumber, updateGuess } = props;
            updateInputNumber(num);
            updateGuess(InitialGuess(num));
        },
    }),
    withHandlers({
        onCalculateSqrt: ({ SetNumber, inputNumber, guess, inputIterationCount }: any) => () => {
            SetNumber(inputNumber, guess, inputIterationCount);
        },
        onUpdateAutoGuess: ({ inputNumber, autoGuess, updateAutoGuess, updateGuess }: any) => (event) => {
            updateAutoGuess(!autoGuess);
            if (!autoGuess) {
                updateGuess(InitialGuess(inputNumber));
            }
        },
        onUpdateGuess: ({ updateGuess }: any) => (event) => {
            updateGuess(event.target.value);
        },
        onUpdateInputIterationCount: ({ updateInputIterationCount }: any) => (event) => {
            updateInputIterationCount(Math.floor(event.target.value));
        },
        onUpdateInputNumber: ({ updateInputNumber, autoGuess, updateGuess }: any) => (event) => {
            updateInputNumber(event.target.value);
            if (autoGuess) {
                updateGuess(InitialGuess(event.target.value));
            }
        },
    }),
)(SelectANumber);

// TODO: move this from this file
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
