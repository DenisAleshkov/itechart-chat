import React, { Component } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import s from "./SignContainer.module.css";
import { connect } from "react-redux";
import { SIGN_UP, SIGN_IN } from "./../../redux/actions/authActions";

class SignContainer extends Component {
  state = {
    cssClass: "",
  };

  changeRight = () => {
    this.setState({
      cssClass: s.rightPanelActive,
    });
  };

  changeLeft = () => {
    this.setState({
      cssClass: "",
    });
  };

  render() {
    return (
      <div className={s.body}>
        <div className={`${s.container} ${this.state.cssClass}`} id="container">
          <div className={`${s.formContainer} ${s.signUpContainer}`}>
            <SignUp
              isLoading={this.props.isLoading}
              error={this.props.error}
              signUp={this.props.signUp}
            />
          </div>
          <div className={`${s.formContainer} ${s.signInContainer}`}>
            <SignIn
              isLoading={this.props.isLoading}
              error={this.props.error}
              signIn={this.props.signIn}
            />
          </div>
          <div className={s.overlayContainer}>
            <div className={s.overlay}>
              <div className={`${s.overlayPanel} ${s.overlayLeft}`}>
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className={s.ghost}
                  id="signIn"
                  onClick={this.changeLeft}
                >
                  Sign In
                </button>
              </div>
              <div className={`${s.overlayPanel} ${s.overlayRight}`}>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className={s.ghost}
                  id="signUp"
                  onClick={this.changeRight}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);

  return {
    isLoading: state.LoadingReducer.isLoading,
    error: state.AuthReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (login, email, password) =>
    dispatch({ type: SIGN_UP, login, email, password }),
  signIn: (data) => dispatch({ type: SIGN_IN, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignContainer);
