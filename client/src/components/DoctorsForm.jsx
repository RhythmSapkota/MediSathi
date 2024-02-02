import React, { useState, useEffect } from 'react';
import FormRowSelect from "./FormRowSelect";
import FormRow from './FormRow';
import Wrapper from '../assets/wrappers/Dashboard.js';
import WeekScheduleInput from './WeekScheduleInput';
import {TiTick} from 'react-icons/ti'
import{ImCross} from 'react-icons/im'
import {nanoid} from 'nanoid'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const DoctorsForm = ({ doctorSchedule,doctorData }) => {
const [id,setId] = useState("");

  const [openModal, setOpenModal] = useState(false);
 const [scheduleDone,setScheduleDone] = useState(false);
 const [formData, setFormData] = useState({
    speciality: '',
    schedule: {},
  });
const [errors,setErrors] = useState("Please Fill the Form First!!!")
const [error,setError] = useState(false);
//   useEffect(() => {
//     // Log the form data whenever it changes
//     console.log('Form Data:', formData);
//   }, [formData]);

  const handleShowSchedule = () => {
    setOpenModal(!openModal);
  }

  const handleAddDoctor = () => {
    console.log(formData)
    if(formData.name && formData.lName && formData.email && formData.speciality && scheduleDone){  
      if(!errors) {
          console.log(formData);
       doctorData(formData)// The form data will be logged via the useEffect
        }else{
            console.log(errors)
        }
        
      }else{
     toast.error(errors)
      }
    }

  const handleSchedule = (schedule) => {
    setOpenModal(false); 
    // Close the modal
    setFormData((prevFormData) => ({
      ...prevFormData,
      schedule: schedule, // Set the schedule data in the form data
    }));
    setScheduleDone(true);
  }
const checkErrors = (value) =>{
  console.log(value)
  if(value.length > 0 ){
  setErrors(null)
  }else{
    setErrors("Please Fill the Form First!!!")
  }
} 

  // Update the form data when input values change
  const handleInputChange = (event) => {

    const { name, value } = event.target;
 checkErrors(value);
    
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
 
  }
  
  const handleMouseOver = () => {
    setError(!error);
    if (!scheduleDone) {

      // Display an error message or take some action
      errors?  null : setErrors("Please Add Schedule First...");
  
    } else{
       setErrors("")
    }
  }
  

  return (
    <>
      <h4 className='form-title'>Manage Doctors</h4>
      <hr />
      <br />
      <input type='text' defaultValue={id} hidden/>
      <FormRow
        type="text"
        labelText={"First Name"}
        name="name"
        placeholder="Doctor's First Name"
        value={formData.fullName}
        onChange={handleInputChange}
      />
       <FormRow
        type="text"
        labelText={"Last Name"}
        name="lName"
        placeholder="Doctor's Last Name"
        value={formData.fullName}
        onChange={handleInputChange}
      />
      <FormRow
        type="text"
        name="speciality"
        placeholder="Doctor's Speciality"
        value={formData.speciality}
        onChange={handleInputChange}
      />
      <FormRow
      type="text"
      name="email"
      placeholder="Doctor's Email"
      value={formData.email}
      onChange={handleInputChange}/>
      <br />
      <div style={{display:'inline-flex'}}> <button type='button' className='btn form-btn' onClick={handleShowSchedule}>Manage Schedule</button> 
       <p>{scheduleDone? <TiTick size={40} style={{marginTop:"23px", marginLeft:"6px", color:"green"}}/>: <ImCross size={33} style={{marginTop:"20px", marginLeft:"8px", color:"red"}}/> }</p> </div>

      <button type='button' className='btn form-btn' onClick={handleAddDoctor}  onMouseOver={handleMouseOver} onMouseOut={()=>setError(!error)}> Add Doctor</button>
      {error && errors? <p style={{color:"red",marginTop:"5px"}}>{errors}</p>: null}
      <div className={openModal ? "modal modal-open" : "modal"} onClick={() => setOpenModal(!openModal)}>
        {/* <div className='modal-content' onClick={(e) => e.stopPropagation()}> */}
          <WeekScheduleInput doctorSchedule={handleSchedule} />
        {/* </div> */}
      </div>
    </>
  );
}

export default DoctorsForm;
