import * as React from "react";
import Recaptcha from "react-google-recaptcha";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers, withProps, withState } from "recompose";
import { ApplicationState } from "../store";
import { ActionCreators as emailActions } from "../store/actions/emailActions";
import { Section } from "./Section";

const RecaptchaMarkup = ({ siteKey, onValidate }) => (
    <Section title="recaptcha" isDark={false} >
        <h5>I need to make sure your not a robot</h5>
        {(siteKey !== undefined) ?
            (<Recaptcha
                sitekey={siteKey}
                onChange={onValidate}
            />)
            :
            (<p>Loading reCaptcha...</p>)
        }

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

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(name + "=([^;]+)"));
    if (match) {
        return match[1];
    }
    return null;
};

const binder = compose<{ siteKey, email, onValidate }, {}>(
    connect(
        (state: ApplicationState) => ({ email: state.email.email, siteKey: state.email.sitekey }),
        emailActions,
    ),
    lifecycle({
        componentWillMount() {
            const props: any = this.props;
            const { email, SetEmail, siteKey, GetSiteKey } = props;

            if ((email !== undefined && email.length > 0) ||
                (siteKey !== undefined && siteKey.length > 0)) {
                return;
            }
            GetSiteKey();
        },
    }),
    withHandlers({
        onValidate: (props: any) => (event) => {
            props.GetEmail(event);
        },
    }),
);

export const BoundContact = binder(Contact);
