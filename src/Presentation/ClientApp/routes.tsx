import * as React from "react";
import { Route } from "react-router-dom";
import { BoundContact } from "./components/Contact";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import Home from "./components/Home";
import { Layout } from "./components/Layout";
import { Projects } from "./components/Projects";
import { BoundSquareRoots } from "./components/SquareRoots/index";
import { Wip } from "./components/Wip";

export const routes = (
    <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetchdata/:startDateIndex?" component={FetchData} />
        <Route path="/contact" component={BoundContact} />
        <Route path="/projects" component={Projects} />
        <Route path="/BabylonianSquareRoots" component={BoundSquareRoots} />
    </Layout>
);
