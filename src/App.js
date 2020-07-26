import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./component/dashboard/Dashboard";
import Search from "./component/Search/SearchPart";
import { Container, Header, Icon, Segment } from "semantic-ui-react";

const App = () => (
  <Provider store={store}>
    <Router>
      <Container className="searching">
        <Segment className="website-name" color="#512DA8">
          <Header as="h1" size="huge" textAlign={"center"} color="blue">
            <Icon name="food" color="olive" />
            RECIPE APP
          </Header>{" "}
        </Segment>
      </Container>

      <Route exact path="/" component={Dashboard} />
      <Route exact path="/search" component={Search} />
    </Router>
  </Provider>
);

export default App;
