import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/JobInfo'
import Doctors from './Doctors';
import ScoreCard from './ScoreCard';

const HospitalInfo = ({ icon, text, rating}) => {
const {doctors,date,hospitalType} = text;



  return (<Wrapper>
      <span className='job-icon' style={{marginTop:"1rem"}}>{icon}</span>
      <span className='job-text' style={{marginTop:"1rem"}}>{hospitalType}</span> 

    </Wrapper>
   
  );
}

export default HospitalInfo;
