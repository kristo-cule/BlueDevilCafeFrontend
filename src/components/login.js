import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogon = this.handleLogon.bind(this);

    this.state = {
      username: "",
      password: "",
      message: ""
    }
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
    console.log("username changed");

  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
    console.log("password changed");
  }

  handleLogon() {
    if (this.state.username === "ltuadmin") {
      this.props.handleLogonChange(true);
      console.log("Changing parent state");
    }
    else{
      this.setState({
        message: "Incorrect Credentials"
      });
    }
  }

  render() {
    return (
      <form>
        <h3>Admin Portal</h3>

        <div className="form-group">
          <label>Username</label>
          <input type="username" className="form-control" placeholder="Enter Username" onChange={(e) => this.handleUsernameChange(e)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => this.handlePasswordChange(e)} />
        </div>

        <button type="button" className="btn btn-primary btn-block" onClick={this.handleLogon}>Submit</button>

        <p>{this.state.message}</p>
      </form>
    )
  }

}

export default Login;