import * as React from "react";
import Recaptcha from "react-google-recaptcha";
import { compose, lifecycle, withHandlers, withProps, withState } from "recompose";
import { Section } from "./Section";

// JavaScript variable defined in Index.cshtml
declare var reCaptchaSiteKey: string;

const Contact = ({ onValidate }) => (
    <Section title="" isDark={false} >
        <h5>I need to make sure your not a robot</h5>
        <Recaptcha
            sitekey={reCaptchaSiteKey}
            onChange={onValidate}
        />
    </Section>
);

const binder = compose<{ onValidate }, {}>(
    withHandlers({
        onValidate: (props) => (event) => {
            console.log("validated?");
        },
    }),
);

export const BoundContact = binder(Contact);
