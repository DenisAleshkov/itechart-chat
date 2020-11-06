import React, { Component } from "react";
import { connect } from "react-redux";

class SignIn extends Component {
  handleSumbit = (e) => {
    e.preventDefault();
    this.props.auth(this.state);
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
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input
          required
          placeholder="Email"
          type="email"
          id="emailIN"
          onChange={this.handleChange}
        />
        <input
          required
          placeholder="Password"
          type="password"
          id="passwordIN"
          onChange={this.handleChange}
        />
        <button disabled={isLoading}>
          {isLoading ? `Loading...` : `LOGIN`}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.AuthReducer.error,
  isLoading: state.LoadingReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  auth: (data) => dispatch({ type: "SIGN_IN", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
