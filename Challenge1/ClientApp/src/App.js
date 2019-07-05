import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import FetchData from "./components/FetchData";
import ProductEditing from "./components/ProductEditing";
import ProductCreating from "./components/ProductCreating";

export default () => (
  <Layout>
    <Route exact path="/" component={FetchData} />
    <Route path="/:id/edit" component={ProductEditing} />
    <Route path="/create" component={ProductCreating} />
  </Layout>
);
