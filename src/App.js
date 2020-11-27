import React from "react";
import SignContainer from "./views/SignContainer/SignContainer";
import Chat from "./views/Chat/Chat";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PublicRoute exact isAuth={this.props.isAuth} path="/" component={SignContainer} />
          <PrivateRoute exact path="/chat" component={Chat} />
        </Switch>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
});

export default connect(MapStateToProps, null)(App);
