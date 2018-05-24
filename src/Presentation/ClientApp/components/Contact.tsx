import * as React from "react";
import Recaptcha from "react-google-recaptcha";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers, withProps, withState } from "recompose";
import { ApplicationState } from "../store";
import { ActionCreators as emailActions } from "../store/actions/emailActions";
import { Section } from "./Section";

declare const reCaptchaSiteKey: string;

const RecaptchaMarkup = ({ siteKey, onValidate }: { siteKey: string, onValidate: (token: string | null) => void }) => (
    <Section title="recaptcha" isDark={false} >
        <h5>I need to make sure your not a robot</h5>
        <Recaptcha
            sitekey={siteKey}
            onChange={onValidate}
        />

    </Section>
);

const ContactInfo = ({ email }) => (
    <Section title="email" isDark={false}>
        <h3>Email Address:</h3>
        <h5><a href={"mailto:" + email}>{email}</a></h5>
    </Section>
);

const Contact = ({ siteKey, email, onValidate }: { siteKey: string, email: string, onValidate: () => void }) => {
    if (email !== undefined && email.length > 0) {
        return (<ContactInfo email={email} />);
    } else {
        return (<RecaptchaMarkup siteKey={siteKey} onValidate={onValidate} />);
    }
};

export const BoundContact = compose<{ siteKey, email, onValidate }, {}>(
    connect(
        (state: ApplicationState) => ({ email: state.email.email }),
        emailActions,
    ),
    lifecycle({
        componentWillMount() {
            const props: any = this.props;
            const { email, GetEmail } = props;

            if (email !== undefined && email.length > 0) {
                return;
            }
            GetEmail();
        },
    }),
    withProps({
        siteKey: (typeof reCaptchaSiteKey === "undefined") ? "" : reCaptchaSiteKey,
    }),
    withHandlers({
        onValidate: ({ GetEmail }: any) => (event) => {
            GetEmail(event);
        },
    }),
)(Contact);
