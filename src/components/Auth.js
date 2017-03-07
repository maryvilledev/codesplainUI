import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
import { Link } from 'react-router'
//Code is passed in from Github
class Auth extends React.Component {
  constructor() {
    super()
    this.state = {
      waiting: true,
      authenticated: false,
    }
  }
  componentDidMount() {
    const { code } = this.props.location.query
    axios.post('/api/auth',{
      code,
    }).then((res) => {
      //Code was accepted, the token should be in the response data
      const { token } = res.data
      cookie.save('token', token)
      this.setState({waiting: false, authenticated: true})
    }).catch((err) => {
      console.error(err)
      this.setState({waiting: false, authenticated: false})
    })
  }
  render() {
    const { waiting, authenticated } = this.state
    if(waiting) {
      return (
        <div>Waiting on Github...</div>
      )
    } else if (authenticated) {
      return (
        <Link path="/">You are good to go!</Link>
      )
    } else {
      return (
        <Link to="/">Login failed, please try again</Link>
      )
    }
  }
}

export default Auth
