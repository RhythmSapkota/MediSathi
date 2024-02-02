import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/JobInfo'
import Doctors from './Doctors';
import ScoreCard from './ScoreCard';

const HospitalInfo = ({ icon, text, rating}) => {
const {doctors,date,hospitalType} = text;



  return (<Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{hospitalType}</span> 

    </Wrapper>
   
  );
}

export default HospitalInfo;
