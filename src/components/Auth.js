import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
//Code is passed in from Github
const Auth = ({location: {query: {code}}}) => {
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
  return null
}

export default Auth
