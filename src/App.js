import React from "react";
import SignContainer from "./components/Sign/SignContainer";
import Chat from "./components/Chat/Chat";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {this.props.isAuth && <Redirect to="/chat" />}
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

const MapStateToProps = (state) => ({ isAuth: state.AuthReducer.isAuth });

export default connect(MapStateToProps, null)(App);
