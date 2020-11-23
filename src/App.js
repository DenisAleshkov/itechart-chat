import React from "react";
import SignContainer from "./views/SignContainer/SignContainer";
import Chat from "./views/Chat/Chat";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  renderComponent = () => {
    const token = localStorage.getItem("token");
    if (token || this.props.isAuth) {
      return <Redirect to="/chat" />;
    } else {
      return <Redirect to="/" />;
    }
  };
  render() {
    return (
      <div className="App">
        {this.renderComponent()}
        <Switch>
          <Route exact path="/">
            <SignContainer />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
});

export default connect(MapStateToProps, null)(App);
