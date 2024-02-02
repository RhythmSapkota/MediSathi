import React, { useState, useEffect } from 'react';
import { BsCalendar2XFill } from 'react-icons/bs';

const WeekScheduleInput = ({ doctorSchedule }) => {
  // Define the initial schedule with default values
  const initialSchedule = {
    Monday: { date: '', startTime: '10:00', endTime: '16:00' },
    Tuesday: { date: '', startTime: '10:00', endTime: '16:00' },
    Wednesday: { date: '', startTime: '10:00', endTime: '16:00' },
    Thursday: { date: '', startTime: '10:00', endTime: '16:00' },
    Friday: { date: '', startTime: '10:00', endTime: '16:00' },
    Saturday: { date: '', startTime: '10:00', endTime: '16:00' },
    Sunday: { date: '', startTime: '10:00', endTime: '16:00' },
  };

  // Define state variables
  const [schedule, setSchedule] = useState(initialSchedule);

  // Calculate upcoming dates for each day
  useEffect(() => {
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const updatedSchedule = {};
    daysOfWeek.forEach((day, index) => {
      const upcomingDate = new Date(today);
      upcomingDate.setDate(today.getDate() + (index - today.getDay() + 7) % 7);

      updatedSchedule[day] = {
        date: upcomingDate.toISOString().slice(0, 10),
        startTime: '10:00',
        endTime: '16:00',
      };
    });

    setSchedule(updatedSchedule);
  }, []);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [timeField, day] = name.split('-'); // e.g., "startTime-Monday"

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [timeField]: value,
      },
    }));
  };

  // Handle marking a day as "DayOff"
  const handleDelete = (day) => {
    const updatedSchedule = { ...schedule }; // Create a copy of the schedule object
    delete updatedSchedule[day]; // Remove the day from the copy

    setSchedule(updatedSchedule); // Update the state with the modified schedule
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the doctorSchedule function to handle the updated schedule
    doctorSchedule(schedule);

    // Reset the schedule to the initial state
    setSchedule(initialSchedule);
  };

  return (
    <>
      <div className='heading-schedule-main'>
        <h2>Manage Doctor's Schedule</h2>
      </div>
      <hr />
      <div className="form-grid-schedule">
        {Object.entries(schedule).map(([day, { date, startTime, endTime }]) => (
          <div key={day} className="day-container" onClick={(e) => e.stopPropagation()}>
            <div className='heading-schedule'>
              <h3>{day}</h3>
           
            </div>
            <hr />
            <div>
              <p className='form-label-schedule'>Date:</p>
              <p className='form-input-schedule'>{date}</p>
            </div>
            <div>
              <p className='form-label-schedule'>Start Time:</p>
              <input
                className='form-input-schedule'
                type="time"
                name={`startTime-${day}`}
                value={startTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className='form-label-schedule'>End Time:</p>
              <input
                className='form-input-schedule'
                type="time"
                name={`endTime-${day}`}
                value={endTime}
                onChange={handleInputChange}
              />
            </div>
            <br/>
            <button style={{marginLeft:"12px"}} className='btn form-btn-schedule-off' onClick={() => handleDelete(day)} type='button'>
              <BsCalendar2XFill/> Day Off
              </button>
          </div>
        ))}
        <div className="submit-button">
          <button className='btn form-btn form-btn-schedule' type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default WeekScheduleInput;
