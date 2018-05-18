import * as React from "react";
import { Route } from "react-router-dom";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import Home from "./components/Home";
import { Layout } from "./components/Layout";
import { Wip } from "./components/Wip";

export const routes = (
    <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetchdata/:startDateIndex?" component={FetchData} />
        <Route path="/contact" component={Wip} />
        <Route path="/projects" component={Wip} />
    </Layout>
);
