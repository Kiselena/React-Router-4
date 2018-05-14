import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Sidenav from "./components/Sidenav";
import Book from "./pages/Book";
import Logout from "./pages/Logout";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  state = {
    user: null
  };

  login = user => {
    this.setState({ user }, () => this.props.history.push("/books"));
  };

  logout = () => {
    this.setState({ user: null }, () => this.props.history.push("/"));
  };

  render() {
    return (
      <div className="app">
        <Toolbar user={this.state.user} />
        <Content>
          <Route
            path="/books"
            render={() => <Sidenav topics={this.props.topics} />}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route
              path="/login"
              render={props => <Login onLogin={this.login} />}
            />
            <Route
              path="/logout"
              render={props => <Logout onLogout={this.logout} />}
            />
            <PrivateRoute
              exact
              path="/books/:topic?"
              component={Books}
              data={this.props.books}
              user={this.state.user}
            />
            <PrivateRoute
              path="/books/:topic/:book"
              component={Book}
              data={this.props.books}
              user={this.state.user}
            />

            <Route component={NotFound} />
          </Switch>
        </Content>
      </div>
    );
  }
}

export default withRouter(App);
