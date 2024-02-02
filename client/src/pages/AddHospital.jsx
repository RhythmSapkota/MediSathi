import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { redirect, useNavigate, useOutletContext,  } from "react-router-dom";
import { HOSPITAL_LOCATION, HOSPITAL_TYPE } from "../../../utils/constants.js";
import { Form, useNavigation } from "react-router-dom";
import { useState } from "react";
import DoctorsForm from "../components/DoctorsForm";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request}) => {

  // function getParametersFromUrl(url) {
  //   const params = new URLSearchParams(url.search);
  //   const parameters = {};
  
  //   for (const [key, value] of params.entries()) {
  //     parameters[key] = value;
  //   }
  
  //   return parameters;
  // }
  
  // const url = new URL(request.url);
  // const parameters = getParametersFromUrl(url);
  
  // console.log(JSON.parse(parameters.doctors)); 
  // console.log(parameters);
  
  const formData = await request.formData();
const data = Object.fromEntries(formData);
const finalData = { ...data, doctors: JSON.parse(data.doctors) };

try {
  // Register the doctors and obtain their IDs
  const response = await customFetch.post('/doctors/registerDoctor', finalData.doctors);

  const { doctorIds } = response.data;

  // Map the doctors and assign their IDs
  const updatedDoctors = finalData.doctors.map((doctor, i) => {
    doctor._id = doctorIds[i];
    return doctor;
  });
console.log(updatedDoctors)
  // Update the finalData with the updated doctors
  const veryFData = { ...finalData, doctors: updatedDoctors };

  console.log(veryFData)
  // Make the request to add the hospital with the updated data
  await customFetch.post('/hospitals', veryFData);

  toast.success("Hospital Added Successfully");
  return redirect('/dashboard');
} catch (error) {
  console.log(error);
  // Handle the error appropriately                              
  toast.error(error.response.data.msg);
  return error;
}


};
const AddHospital = () => {
  const {user} = useOutletContext();
  console.log(user)
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [showAllForm, setShowAllForm] = useState(false);
  const [hName,setHospitalName] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleAddDoctors = () => {
    checkErrors(hName)? toast.error("Hospital Name is Required."):setShowAllForm(!showAllForm);

  };

  const handleDoctorData = (data) => {
    // Add the new doctor data to the list of doctors
    setDoctors([...doctors, data]);
    
    navigate(`/dashboard/admin/add-hospital?doctors=${JSON.stringify([...doctors, data])}`)
    setShowAllForm(false);
  };

  const checkErrors = (values) =>{
if(values.length > 0 ){
  return false;
}else{
  return true
}
  }

  const handleInputChange = (e) =>{
          const hospitalName = e.target.value;
       setHospitalName(hospitalName)
  }


  return (
    <Wrapper>
      <Form method="post" state={{doctors:doctors}}  className="form">
        <div className="form-center">
          <FormRow type="text" name="hospital" placeholder="Hospital Name" onChange={handleInputChange}/>
          <FormRowSelect
            labelText={"Hospital Location"}
            name={"hospitalLocation"}
            defaultValue={HOSPITAL_LOCATION.KATHMANDU}
            list={Object.values(HOSPITAL_LOCATION)}
          />
          <FormRowSelect
            labelText={"Hospital Type"}
            name={"hospitalType"}
            defaultValue={HOSPITAL_TYPE.HOSPITAL}
            list={Object.values(HOSPITAL_TYPE)}
          />
          <textarea hidden type="text" value={JSON.stringify(doctors)} name={"doctors"} onChange={()=>{console.log("sss")}}/>
       
          
          {showAllForm ? (
            <div>
              <DoctorsForm doctorData={handleDoctorData} />
            </div>
          ) :<> <button type="button" className="btn form-btn-schedule" onClick={handleAddDoctors}>
         {doctors.length > 0? "Add More Doctors" :  "Add Doctors" }
        </button>
         </>  }

          {/* Display the list of added doctors in a box */}
          {doctors.length > 0 && (
            <div className="added-doctors-box">
              <h5>Added Doctors</h5>
              <ul>
                {doctors.map((doctor, index) => (
                  <li key={index}> {doctor.name} {" "} {doctor.lName}</li>
                  ))}
              </ul>
            </div>
          )}
          {doctors.length > 0 ? <button type="submit" className="btn form-btn" >{"Confirm Hospital Details"}</button>: null}
         
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddHospital;
