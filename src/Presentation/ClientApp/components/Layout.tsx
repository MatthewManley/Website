import * as React from "react";
import { NavMenu } from "./NavMenu";

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <NavMenu />
                {this.props.children}
            </>
        );
    }
}
