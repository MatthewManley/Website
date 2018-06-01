import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers, withProps, withState } from "recompose";
import { ApplicationState } from "../../store";
import { ActionCreators as SquareRootActions } from "../../store/actions/SquareRootActions";
import { InitialGuess } from "../../store/SquareRoot";

const SelectANumber = ({ inputNumber, onUpdateInputNumber, guess, onUpdateGuess, autoGuess, onUpdateAutoGuess, onCalculateSqrt }) => (
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
            Guess for me <input type="checkbox" checked={autoGuess} onChange={onUpdateAutoGuess} />
        </div>
        <br />
        <button className="btn" onClick={onCalculateSqrt}>Calculate Square Root</button>
    </div>
);

export const BoundSelectANumber = compose<{ inputNumber, onUpdateInputNumber, guess, onUpdateGuess, autoGuess, onUpdateAutoGuess, onCalculateSqrt }, {}>(
    connect(
        (state: ApplicationState) => ({ num: state.squareRoot.num, guess: state.squareRoot.guess }),
        SquareRootActions,
    ),
    withState("autoGuess", "updateAutoGuess", true),
    withState("inputNumber", "updateInputNumber", ({ num }: any) => (num)),
    withState("guess", "updateGuess", ({ guess }: any) => (guess)),
    withHandlers({
        onCalculateSqrt: ({ SetNumber, inputNumber, guess, inputIterationCount }: any) => () => {
            SetNumber(parseFloat(inputNumber), parseFloat(guess), inputIterationCount);
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
        onUpdateInputNumber: ({ updateInputNumber, autoGuess, updateGuess }: any) => (event) => {
            updateInputNumber(event.target.value);
            if (autoGuess) {
                updateGuess(InitialGuess(event.target.value));
            }
        },
    }),
)(SelectANumber);
