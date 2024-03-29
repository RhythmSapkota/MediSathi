import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { useEffect, useState } from 'react';
import SentPage from './linkSentPage';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/forgot-password', data);
        toast.success('Password Reset Link is Sent')
        const isSent = { isSent: true,email:data.email}
        return isSent
    } catch (error) {
        const errorMsg = await error.response.data.msg;
        toast.error(errorMsg)
        return { error: true, msg: errorMsg };
    }
}

const ForgotPassword = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState()
    const [isSent, setIsSent] = useState(false)
    const data = useActionData();

const handleData = (data) =>{
    if (data?.error) {

        setError(data.error)
    }
    if(data?.isSent && data?.email){
        setEmail(data?.email)
        setIsSent(data?.isSent)
    }
}

const handleIsSent = () =>{
    setIsSent(false)
}

    useEffect(() => {
      if(data){
          handleData(data)
      }
    }, [data])
    const navigation = useNavigation();
    const isSubbmitting = navigation.state === "submitting";
    return (
        <>
        {!isSent? <Wrapper>

            <Form method='post' className='form'>
                <Logo />
                <h4>
                    Forgot Password
                </h4>
                <FormRow type="email" name='email' placeholder="Enter your email" required onChange={() => setError(false)} />
                {error && <p style={{ color: 'red' }}>{data?.msg}</p>}
                <button type='submit' className='btn btn-block' disabled={isSubbmitting}>{isSubbmitting ? 'Sending...' : "Send Link"}</button>
                <p>Dont want to reset?<Link to={"/login"} className="member-btn">Login</Link>
        </p>
            </Form>
        </Wrapper>: <SentPage email={email} setIsSent={handleIsSent}/>}
        </>
    );
};

export default ForgotPassword;
