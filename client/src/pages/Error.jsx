import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'
import forbidden from '../assets/images/forbidden.png'


const Error = () => {
  const error = useRouteError();
console.log(error)
  if (error?.status === 404){
 
 return   <Wrapper>
      <div>
        <img src={img} alt = "not_found"/>
        <h3>Ohh! Page Not Found </h3>
        <p>We cannot seem to find the page you are looking for</p>
        <Link to='/dashboard'>Back Home</Link>
      </div>
    </Wrapper>
  } 

  if (error?.response.status === 403){
 
    return   <Wrapper>
         <div>
           <img src={forbidden} alt = "not_found"/>
           {/* <h3>Unauthorized!!</h3>
           <p>You are not Authorized to access this page </p> */}
           <Link to='/dashboard'>Back Home</Link>
         </div>
       </Wrapper>
     } 

     if (error?.response.status === 401){
 
      return   <Wrapper>
           <div>
             <img src={forbidden} alt = "UnAuthorized"/>
             {/* <h3>Unauthorized!!</h3>
             <p>You are not Authorized to access this page </p> */}
             <Link to='/dashboard'>Back Home</Link>
           </div>
         </Wrapper>
       } 
  return (
    <Wrapper>
     <div>
     <h1>
        Opps!!! Something Went Wrong
        </h1>
      </div> 
  
    </Wrapper>
  )
}

export default Error