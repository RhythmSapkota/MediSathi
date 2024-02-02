import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaStethoscope, FaUserMd, FaFileAlt, FaUser } from 'react-icons/fa';
import dayjs from 'dayjs';
import DownloadButton from './DownloadButton';
import customFetch from '../utils/customFetch';

const primaryColor = '#007bff';

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const CardWrapper = styled.div`
  flex: 1;
  position: static;
  background-color: var(--background-secondary-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-right: 16px; /* Increased margin to create space between cards */
  margin-bottom: 16px; /* Added margin to create space between rows */
  width: calc(50% - 16px); /* Set card width to 50% of the container minus margin */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:nth-child(2n) {
    margin-right: 0; /* Remove margin for every second card in a row */
  }
};`

// Rest of your code remains the same


const CardHeader = styled.h5`
  color: ${primaryColor};
  font-size: 24px;
  margin-bottom: 5px;
  margin-top:5px;
  padding:10px;
  display: flex;
  font-family: 'Roboto', sans-serif;

  svg {
    margin-right: 12px;
    color: ${primaryColor};
    font-size: 28px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  font-family: 'Arial', sans-serif;
  color:var(--text-color)
  `;
  
  const CardRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-left: 13px;

  svg {
    margin-right: 12px;
    color: ${primaryColor};
    font-size: 24px;
  }
`;

const StatusBadge = styled.div`
  position: inherit;
  max-width:200px;
  margin-left:20rem;
  background-color: ${props => getStatusColor(props.status)};
  color: white;
  padding: 7px 14px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
`;

const getStatusColor = status => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#ffc107'; // Yellow
    case 'completed':
      return '#28a745'; // Green
    case 'rejected':
      return '#dc3545'; // Red
    default:
      return '#6c757d'; // Gray
  }
};  


const BookingCard = ({
  _id,
  hospitalName,
  doctorName,
  doctorLastName,
  schedule,
  issueDescription,
  bookedByName,
  applicationStatus,
  applicantNo,
  report
}) => {
  const formattedDate = dayjs(schedule).format('MMMM D, YYYY, h:mm A');

console.log(report)
 
  return (
    <CardGrid>
      <CardWrapper>
        <StatusBadge status={applicationStatus}>{applicationStatus}</StatusBadge>
        <CardHeader>
          <FaUserMd /> {hospitalName}
        </CardHeader>
        <CardContent>
      <CardRow style={{fontWeight:"600"}}>
            <FaCalendarAlt /> Your Applicant Number: {applicantNo}
          </CardRow>
          <CardRow>
            <FaStethoscope /> Doctor: {doctorName} {doctorLastName}
          </CardRow>
        </CardContent>
        <CardContent>
          <CardRow>
            <FaCalendarAlt /> Schedule: {formattedDate}
          </CardRow>
        </CardContent>
        <CardContent>
          <CardRow>
            <FaFileAlt /> Issue Description: {issueDescription}
          </CardRow>
          <CardRow>
            <FaUser /> Booked By: {bookedByName} (You)
          </CardRow>
    

        </CardContent>
    {report? <> <CardRow>
            Download Your Report : 
          </CardRow>
            <DownloadButton bookingId= {_id}/></> : null}
      </CardWrapper>
    </CardGrid>
  );
};

export default BookingCard;
