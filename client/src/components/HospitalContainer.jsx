import { useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/JobsContainer';
import Hospital from './Hospital';
import { useState } from 'react';
import Doctors from './Doctors';
import { IoArrowBackSharp } from 'react-icons/io5';
 // Import your CSS file

const HospitalContainer = ({ showData }) => {
  const { data } = useLoaderData();
  const { hospitals } = data;
  const [doctors, setDoctors] = useState([]);
  const [showDoctor, setShowDoctor] = useState(false);
  const [hospital, setHospital] = useState("");

  const handleView = (val, doctors, hospital,_id) => {
    setDoctors(doctors);
    setHospital({_id,hospital});
    showData(false);
    setShowDoctor(val);
  }

  console.log(hospital)
  if (hospitals.length === 0) {
    return (
      <Wrapper>
        <h2>No Hospitals to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {!showDoctor ? (
        <div className='jobs'>
          {hospitals.map((hospital) => {
            return <Hospital key={hospital._id} {...hospital} showDoctors={handleView} />;
          })}
        </div>
      ) : (
        <div>
          <h4 className='hospital-heading'>
            {/* {hospital.hosptial} Doctors */}
          </h4>
          <button className='back-button' onClick={()=>{setShowDoctor(!showDoctor) 
          showData(true)
          }}>
            <IoArrowBackSharp />
          </button>
          <Doctors data={doctors}  hospital = {hospital} />
        </div>
      )}
    </Wrapper>
  );
}

export default HospitalContainer;
