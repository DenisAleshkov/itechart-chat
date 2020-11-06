import React, { Component } from "react";
import { connect } from "react-redux";

class SignUp extends Component {
  state = {
    email: "",
    login: "",
    password: "",
  };

  handleSumbit = (e) => {
    e.preventDefault();
    this.props.signUp(
      this.state.login,
      this.state.emailUP,
      this.state.passwordUP
    );
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { isLoading, error } = this.props;
    console.log("error", error);
    return (
      <form onSubmit={this.handleSumbit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input
          type="text"
          placeholder="Login"
          id="login"
          onChange={this.handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="emailUP"
          onChange={this.handleChange}
        />
        <input
          type="password"
          id="passwordUP"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button disabled={isLoading}>
          {isLoading ? `Loading` : `SIGN UP`}
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (login, email, password) =>
    dispatch({ type: "SIGN_UP", login, email, password }),
});

const mapStateToProps = (state) => ({
  isLoading: state.LoadingReducer.isLoading,
  error: state.AuthReducer.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
