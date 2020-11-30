import React, { Component } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import style from "./SignContainer.module.css";
import { connect } from "react-redux";
import { signIn, signUp } from "../../store/actions/authActions";
class SignContainer extends Component {
  state = {
    cssClass: "",
  };

  changeRight = () => {
    this.setState({
      cssClass: style.rightPanelActive,
    });
  };

  changeLeft = () => {
    this.setState({
      cssClass: "",
    });
  };
  render() {
    return (
      <div className={style.body}>
        <div className={`${style.container} ${this.state.cssClass}`} id="container">
          <div className={`${style.formContainer} ${style.signUpContainer}`}>
            <SignUp
              isLoading={this.props.isLoading}
              signUp={this.props.signUp}
            />
          </div>
          <div className={`${style.formContainer} ${style.signInContainer}`}>
            <SignIn
              isLoading={this.props.isLoading}
              signIn={this.props.signIn}
            />
          </div>
          <div className={style.overlayContainer}>
            <div className={style.overlay}>
              <div className={`${style.overlayPanel} ${style.overlayLeft}`}>
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className={style.ghost}
                  id="signIn"
                  onClick={this.changeLeft}
                >
                  Sign In
                </button>
              </div>
              <div className={`${style.overlayPanel} ${style.overlayRight}`}>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className={style.ghost}
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
