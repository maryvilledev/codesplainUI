import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
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
      location = '/'
    }).catch((err) => {
      console.error(err)
      location = '/'
    })
  }
  render() {
    return null
  }
}

export default Auth
