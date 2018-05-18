import * as React from "react";
import { BuildDate } from "../BuildDate";

export const Footer = () => (
    <footer className="bg-dark footer">
        <div className="container">
            <p className="m-0 text-center text-white">Last Updated {BuildDate}</p>
        </div>
    </footer>
);

export default Footer;
