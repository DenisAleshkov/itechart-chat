import React from "react";
import SignContainer from "./views/SignContainer/SignContainer";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SignContainer />
          </Route>
        </Switch>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({ isAuth: state.AuthReducer.isAuth,})
  
export default connect(MapStateToProps, null)(App);
