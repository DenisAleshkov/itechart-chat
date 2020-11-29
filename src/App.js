import React from "react";
import SignContainer from "./views/SignContainer/SignContainer";
import Chat from "./views/Chat/Chat";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PublicRoute component={SignContainer} isAuth={this.props.isAuth} path="/" exact/>
          <PrivateRoute component={Chat} isAuth={this.props.isAuth} path="/chat" exact />
        </Switch>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
});

export default connect(MapStateToProps, null)(App);
