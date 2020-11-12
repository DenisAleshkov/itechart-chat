import React, { Component } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import s from "./SignContainer.module.css";
import { connect } from "react-redux";
import { signIn, signUp } from "../../store/actions/authActions";

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
              signUp={this.props.signUp}
            />
          </div>
          <div className={`${s.formContainer} ${s.signInContainer}`}>
            <SignIn
              isLoading={this.props.isLoading}
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

const mapStateToProps = (state) => ({
  isLoading: state.LoadingReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
  signUp: (credentials) => dispatch(signUp(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignContainer);
