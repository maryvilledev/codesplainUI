import React from 'react'
import axios from 'axios'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

//Code is passed in from Github
const Auth = ({location: {query: {code}}}) => {
  axios.post('/api/auth',{
    code,
  })
  return null
}

export default Auth
