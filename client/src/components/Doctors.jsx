import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserMd, FaStethoscope } from 'react-icons/fa';
import { AiFillSchedule, AiOutlineCalendar } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Schedule from './Schedule';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;

const Modal = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Card = styled.div`
  background-color: var(--background-secondary-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
   background-color: var(--hover-primary-color);
  }

  .doctor-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .doctor-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .doctor-name {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
    margin-top: 5px;
    display: flex;
    align-items: center;

    svg {
      font-size: 28px;
      color: #2dc4cf;
      margin-right: 10px;
    }
  }

  .specialty {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-secondary-color);
    display: flex;
    margin-bottom: 5px;
    margin-top: 5px;
    align-items: center;

    svg {
      font-size: 28px;
      color: #2dc4cf;
      margin-right: 10px;
    }
  }

  .status {
    margin-bottom: 15px;
    margin-left: 150px;
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 120px;
    height: 35px;
    display: grid;
    align-items: center;
  }



  .btn {
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      font-size: 20px;
      margin-right: 10px;
    }

    &:hover {
      background-color: #0056b3;
    }
  }


  .book-btn {
    background-color: #c93a4b;

    &:hover {
      background-color: #d94a28;
    }
  }

  .disabled {
    background-color: grey;
    cursor:not-allowed;

    &:hover {
        background-color: grey; 
    }
  }
`;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Doctors = ({ data, hospital }) => {
  const [schedule, setSchedule] = useState({});
  const [doctor, setDoctor] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  const getRandomImageLink = () => {
    const randomImageId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/300/300/?image=${randomImageId}`;
  };

  const handleSchedule = (schedule, fullName) => {
    setOpenModal(true);
    setDoctor(fullName);
    setSchedule(schedule);
  };

  const getSchedule = () => {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDay = daysOfWeek[currentDayIndex];
    return currentDay;
  };

const handleBook = (e,id) => {
  e.preventDefault();
  navigate(`booking/${id}`)
}

function getNextAvailableDay(schedule) {
  // Get the current day as an integer (0 for Sunday, 1 for Monday, etc.)
  const currentDay = new Date().getDay();

  // Map day names to their corresponding integer values
  const dayNameToNumber = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Calculate the closest available day
  let closestDay = null;
  let closestDayDifference = Infinity;

  for (const dayName in schedule) {
    if (schedule[dayName]) {
      const scheduledDay = dayNameToNumber[dayName];
      const dayDifference = (scheduledDay - currentDay + 7) % 7;

      if (dayDifference < closestDayDifference) {
        closestDay = dayName;
        closestDayDifference = dayDifference;
      }
    }
  }

  // If no available days were found, return a message indicating that
  if (closestDay === null) {
    return "No available days";
  }

  return closestDay;
}

console.log(data)
  const day = getSchedule();

  return (
    <Container>
      <Modal open={openModal} onClick={() => setOpenModal(!openModal)}>
        <Schedule schedule={schedule} fullName={doctor} />
      </Modal>
      {data.map((doctor, index) => (
        <Card key={index}>
          <img src={getRandomImageLink()} alt={doctor.fullName} className="doctor-image" />
          <div className="doctor-info">
            <div className={`status pending ${doctor.applicationStatus}`}>Not Applied</div>
            <div className="doctor-name">
              <FaUserMd /> {doctor.name} {""} {doctor.lName}
            </div>
            <div className="specialty">
              <FaStethoscope /> {doctor.speciality}
            </div>
            <div className="specialty">{`Today's Schedule: ${
              doctor.schedule[day]? `${doctor.schedule[day].startTime} - ${doctor.schedule[day].endTime}` : 'No Shift'
            }`}</div>
            <button className="btn job-btn" onClick={() => handleSchedule(doctor.schedule, doctor.name)}>
              View Schedule <AiFillSchedule />
            </button>
            <button onClick={((e) => handleBook(e,doctor._id))} className={`btn book-btn ${doctor.schedule[day]? "" : "disabled"}`} disabled={!doctor.schedule[day]} >
            {doctor.schedule[day]? "Book Now" : "Closed" } <AiOutlineCalendar />
            </button>
            {!doctor.schedule[day] ? (
  <span>
    {doctor.schedule ? (
      `Opens On: ${getNextAvailableDay(doctor.schedule)}`
    ) : (
      'Schedule information not available'
    )}
  </span>
) : null}


          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Doctors;
