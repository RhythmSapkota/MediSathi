import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, FormRowSelect, Logo } from "../components";
import customFetch from "../utils/customFetch";
import {toast} from 'react-toastify';
import { HOSPITAL_LOCATION } from "../../../utils/constants";

export const action = async ({request}) =>{
const formData = await request.formData();
const data = Object.fromEntries(formData);
  try {
   await customFetch.post('/auth/register',data);
   toast.success('Account Created Successfully')
    return redirect('/login')
  } catch (error) {
    const errorMsg = await error.response.data.msg;
    toast.error(errorMsg)
    return error;
  }
}

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className="form">
        <div style={{ display: "inline-flex" }}>
          <Logo />
        </div>

        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          defaultValue="Ram"
          labelText="First Name"
        />
          <FormRow
            type="text"
            name="lastName"
            defaultValue="Sharma"
            labelText="Last Name"
          />
      <FormRowSelect
            labelText={"Location"}
            name={"location"}
            defaultValue={HOSPITAL_LOCATION.LALITPUR}
            list={Object.values(HOSPITAL_LOCATION)}
          />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText={"Password"} />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
      {isSubmitting? 'Registering...' : 'Register'}
        </button>
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login Instead
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
