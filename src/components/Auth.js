import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
import { CircularProgress } from 'material-ui'

//Code is passed in from Github
class Auth extends React.Component {
  constructor() {
    super()
    this.state = {
      waiting: true
    }
  }
  componentDidMount() {
    const { code } = this.props.location.query
    axios.post('/api/auth',{
      code,
    }).then((res) => {
      //Code was accepted, the token should be in the response data
      const { token } = res.data
      cookie.save('token', token, {path: '/'})
      this.setState({waiting: false})
    }).catch((err) => {
      console.error(err)
      this.setState({waiting: false})
    })
  }
  render() {
    const { waiting } = this.state
    if( waiting ) {
      return (
        <CircularProgress size={100} thickness={7} />
      )
    } else {
      window.location = '/'
      return null
    }
  }
}

export default Auth
