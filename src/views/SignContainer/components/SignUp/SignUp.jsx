import React, { Component } from "react";

class SignUp extends Component {
  handleSumbit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { isLoading } = this.props;
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

export default SignUp;
