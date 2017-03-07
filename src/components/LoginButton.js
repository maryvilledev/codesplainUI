import React from 'react'
import cookie from 'react-cookie'
import { FlatButton } from 'material-ui'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`

class LoginButton extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn: cookie.load('token') !== undefined
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin(){
    window.location = GITHUB_URL
  }
  handleLogout(){
    cookie.remove('token')
    this.setState({loggedIn: false})
  }
  render() {
    const { loggedIn } = this.state
    let text=""
    let onClick = null
    if (loggedIn) {
      text = 'Log out';
      onClick = this.handleLogout;
    } else {
      text = 'Log in'
      onClick = this.handleLogin;
    }
    return <FlatButton onClick={onClick} {...this.props}>{text}</FlatButton>
  }
}

export default LoginButton
