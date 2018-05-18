import * as React from "react";
import { Footer } from "./Footer";
import { NavMenu } from "./NavMenu";

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <div className="content">
                    <NavMenu />
                    {this.props.children}
                </div>
                <Footer />
            </>
        );
    }
}
