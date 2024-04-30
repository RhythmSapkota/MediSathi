import React, { useState } from 'react';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import HospitalInfo from './HospitalInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Rating from './Ratings';
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';
import RatingCircle from './RatingCircle';
import ScoreCard from './ScoreCard';

// import hospitalImage from '../assets/hospital-image.jpg'; // Import your hospital image here

day.extend(advancedFormat);

const Hospital = ({
  _id, hospital, doctors, hospitalLocation, hospitalType, createdAt, applicationStatus, showDoctors, averageRating,ratings
}) => {
  const date = day(createdAt).format('MMM DD, YYYY , hh:mm A');
  const data = { doctors, hospitalType, date };
  const [rating, setRating] = useState(averageRating);
  const [totalRating,setTotalRating] = useState(ratings.length)



  const getAllHospitals = async (req, res) => {
    try {
      const hospitalsss = await customFetch.get('/hospitals');
      // res.status(200).json(hospitalsss);
      const hospia = hospitalsss.data.hospitals;
      const currentHospital = hospia.filter((hospital)=> _id === hospital._id)

      setRating(currentHospital[0].averageRating);
      setTotalRating(currentHospital[0].ratings.length);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      // res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const handleRatingUpdate = async (newRating) => {


    const update = { hospital, doctors, hospitalLocation, hospitalType, ratings: newRating };
    try {
      await customFetch.patch(`/hospitals/${_id}`, update);
      setRating(averageRating)
      getAllHospitals();
      toast.success("Hospital Rated");
    } catch (error) {
      const errorMsg = await error.response.data.msg;
      toast.error(errorMsg);
      return error;
    }
  };

  const handleView = () => {
    showDoctors(true, doctors, hospital,_id);
  }

  return (
    <Wrapper>
       <div style={{display:"flex", justifyContent:"space-between", padding:"2rem 3rem 0 2rem"}}> <h5>{hospital}</h5>
          <span>
         <ScoreCard rating = {rating}/>
        </span></div>
      {/* <header> */}
        <div style={{display:"flex",justifyContent:"space-between", padding:"0.5rem 1rem 2rem 2rem"}}>
        <div className="info">
          <p style={{fontSize:"18px"}}>{hospitalLocation}</p>
          <Rating rating={rating} totalRating={totalRating} onUpdateRating={handleRatingUpdate} />

          {/* <div className='content'> */}
            <div className='content-center'>
              <HospitalInfo icon={<FaLocationArrow />} text={data} />
            </div>
            
            <button type='button' style={{padding:"1rem"}} className='btn job-btn' onClick={handleView}>View Doctors</button>

          {/* </div> */}
     
        </div>
      
        <div style={{borderRadius:"30%"}}>
          <img src={"https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg"} alt="Hospital" width={150} height={"auto"}  style={{borderRadius:"35%"}}/>
        </div>
        </div>
      {/* </header> */}
      
    </Wrapper>
  )
}

export default Hospital;
