import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import forbidden from '../assets/images/forbidden.png'
const Forbidden = () => {
    return   <Wrapper style={{minHeight:"50vh"}}>
    <div>
      <img src={forbidden} alt = "not_found"/>
      {/* <h3>Unauthorized!!</h3>
      <p>You are not Authorized to access this page </p> */}
      <Link to='/dashboard'>Back Home</Link>
    </div>
  </Wrapper>
} 

export default Forbidden;