import * as React from "react";

const SquareRoots = ({  }) => (

);

const SelectNumber = () => {
    
}

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
