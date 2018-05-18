import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export const NavMenu = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">Matthew Manley</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                {/* tslint:disable-next-line:jsx-self-close */}
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact to={"/"} className="nav-link">
                            <span className="glyphicon glyphicon-home" /> Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={"/projects"} className="nav-link">
                            <span className="glyphicon glyphicon-home" /> Projects
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to={"/contact"} className="nav-link">
                            <span className="glyphicon glyphicon-home" /> Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
