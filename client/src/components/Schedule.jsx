import React from 'react';
import styled from 'styled-components';
import { FaRegCalendarAlt } from 'react-icons/fa'; // Import icons from react-icons library

const ScheduleContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .icon {
      font-size: 24px;
      margin-right: 10px;
    }

    h3 {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;

  .day-label {
    font-weight: bold;
  }

  .time-range {
    color: var(--text-color;
  }
`;

const Schedule = ({ schedule, fullName }) => {
  const days = Object.keys(schedule);

  return (
    <ScheduleContainer onClick={(e) => e.stopPropagation()}>
      <div className="header">
        <FaRegCalendarAlt className="icon" />
        <h3>{fullName}'s Weekly Schedule</h3>
      </div>
      {days.map((day) => (
        <ScheduleItem key={day}>
          <span className="day-label">{day}</span>
          <span className="time-range">
            {schedule[day].startTime} - {schedule[day].endTime}
          </span>
        </ScheduleItem>
      ))}
    </ScheduleContainer>
  );
};

export default Schedule;
