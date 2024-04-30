import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  useParams,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
export const loader = async () => {

  const url = window.location.href;
  const parts = url.split("/");
  const token = parts[parts.length - 1];
  console.log(token);
  try {
    if (token) {
      await customFetch.get(`/auth/validate-link/${token}`);
      return token;
    }
  } catch (error) {
    console.error("Error occurred during validation:", error);
    throw error;
  }




};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post(`/auth/reset-password/${data.token}`, data);
    toast.success("Password Changed Successfully");
    return redirect("/login");
  } catch (error) {
    const errorMsg = await error.response.data.msg;
    toast.error(errorMsg);
    throw error;
  }
};

const ResetPasswordForm = () => {
  const { token } = useParams();
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubbmitting = navigation.state === "submitting";
  return (
    <>
      <Wrapper>
        <Form method="post" className="form">
          <Logo />

          <h4
            style={{
              marginBottom: "1rem",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Reset Password
          </h4>
          {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
          <FormRow
            type="password"
            name="newPassword"
            labelText="New Password"
          />
          <FormRow
            type="password"
            name="confirmPassword"
            labelText={"Confirm Password"}
          />
          <FormRow
            type={"password"}
            name={"token"}
            defaultValue={token}
            hidden={true}
          />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubbmitting}
          >
            {isSubbmitting ? "Resetting..." : "Reset"}
          </button>
          <p>
            Go Home?
            <Link to={"/login"} className="member-btn">
              Login
            </Link>
          </p>
        </Form>
      </Wrapper>{" "}
    </>
  );
};

export default ResetPasswordForm;
