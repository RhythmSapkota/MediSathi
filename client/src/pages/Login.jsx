import { Link, Form, redirect, useNavigation,useActionData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({request}) =>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors =  {msg:''}
  const validateEmail = () => {
    const email = data.email;
    // Regular expression for a basic email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return !emailRegex.test(email); // Returns true if email is invalid
  }
  
  const isEmailInvalid = validateEmail();
  
  if (isEmailInvalid) {
    errors.msg = 'Email is Invalid';
    return errors;
  }
  
  try {
     await customFetch.post('/auth/login',data);
     toast.success('Login Successful')
      return redirect('/dashboard')
    } catch (error) {
      const errorMsg = await error.response.data.msg;
      toast.error(errorMsg)
      return error;
    }
  }

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubbmitting = navigation.state === "submitting";

  return (
    <Wrapper>
        <Form method='post' className='form'>
          <Logo />
      
        <h4>
            Login
        </h4>
        {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>}
        <FormRow type = "email" name="email" labelText="Email"/>
        <FormRow type = "password" name="password" labelText={"Password"} />
        <button type='submit' className='btn btn-block' disabled={isSubbmitting}>{isSubbmitting? 'Logging In...' : "Login" }</button>
        <button type="button" className='btn btn-block' >Explore as Guest</button>
        <p>Not a member yet?<Link to={"/register"} className="member-btn">Register Instead</Link>
        </p>
        </Form>
    </Wrapper>
  )
}

export default Login