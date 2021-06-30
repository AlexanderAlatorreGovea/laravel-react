import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppProvider, Card, Page } from "@shopify/polaris";
import { Provider, TitleBar } from "@shopify/app-bridge-react";

import MainLayout from "./layouts/MainLayout";
import Home from "./Home";
import CreateNewProductLink from "./links/products/CreateNewProductLink";
import CreateNewCollectionLink from "./links/collections/CreateNewCollectionLink";
import CreateNewCustomLink from "./links/custom/CreateNewCustomLink";
import ShowAllLinks from './links/ShowAllLinks';
import EditCollectionLink from './links/collections/EditCollectionLink';
import EditCustomLink from './links/custom/EditCustomLink';
import EditProductLink from './links/products/EditProductLink';

export default class App extends Component {
    render() {
        const config = {
            apiKey: document.getElementById("apiKey").value,
            shopOrigin: document.getElementById("shopOrigin").value,
            forceRedirect: true
        };

        return (
            <AppProvider>
                <Provider config={config}>
                    <Router>
                        <TitleBar title="Polaris Demo" />
                        <MainLayout>
                        <Switch>
                                <Route path="/app/links/product/new">
                                    <CreateNewProductLink />
                                </Route>
                                <Route path="/app/links/collection/new">
                                    <CreateNewCollectionLink />
                                </Route>
                                <Route path="/app/links/collections/:id/edit">
                                    <EditCollectionLink />
                                </Route>
                                <Route path="/app/links/custom/new">
                                    <CreateNewCustomLink />
                                </Route>
                                <Route path="/app/links/custom/:id/edit">
                                    <EditCustomLink />
                                </Route>
                                <Route path="/app/links/products/:id/edit">
                                    <EditProductLink />
                                </Route>
                                <Route path="/app/links/all">
                                    <ShowAllLinks />
                                </Route>
                                <Route path="/app/">
                                    <Home />
                                </Route>
                            </Switch>
                        </MainLayout>
                    </Router>
                </Provider>
            </AppProvider>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
