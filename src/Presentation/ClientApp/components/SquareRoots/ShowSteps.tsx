import * as React from "react";

export const SqrtSteps = ({ compact, num, guess, iterations }: { compact: boolean, num: number, guess: number, iterations: number[] }) => {
    if (compact) {
        return (
            <>
                {iterations.map((x, i) => <SqrtStepCompact key={i} iteration={i} num={num} guess={x} />)}
            </>
        );
    }
    return (
        <>
            {iterations.map((x, i) => <SqrtStep key={i} iteration={i} num={num} guess={x} />)}
        </>
    );
};

const SqrtStep = ({ iteration, num, guess }) => {
    const step2 = num / guess;
    const step3 = (guess + step2) / 2;
    return (
        <div className="sqrtStep">
            <h5>Iteration {iteration}</h5>
            <p>Step 1 - Guess: {guess}</p>
            <p>Step 2 - Divide {num} by {guess} = {step2}</p>
            <p>Step 3 - Find average of {guess} and {step2} = {step3}</p>
            <p>Step 4 - Start over with a guess of {step3}</p>
        </div>
    );
};

const SqrtStepCompact = ({ iteration, num, guess }) => (
    <p>{iteration}: (({num} / {guess}) + {guess}) / 2 = {((num / guess) + guess) / 2}</p>
);
