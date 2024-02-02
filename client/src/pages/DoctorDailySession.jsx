import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import dayjs from 'dayjs';

// Import icons from react-icons
import { FaPlay, FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDashboardContext } from './DashboardLayout';

const Container = styled.div`
  background-color: var(--background-secondary-colour);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width:50rem;
`;

const Heading = styled.h1`
  color: var(--text-color);
  margin-bottom: 20px;
  font-size:28px;
`;

const SelectHospital = styled.select`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const StartButton = styled.button`
  margin: 10px 0;
  padding: 15px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;

  &:disabled {
    background-color: #ccc; /* Change the background color to a muted gray */
    color: #999; /* Change the text color to a lighter gray */
    cursor: not-allowed; /* Change the cursor to not-allowed to indicate it's disabled */
  }
  &:not(:disabled):hover {
    background-color: var(--primary-900);
  }
`;

const Countdown = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const BookingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
`;

const BookingItem = styled.li`
  background-color: var(--background-color);
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BookingInfo = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TotalAppointments = styled.span`
  margin-left: 5px;
`;
export const loader = async () => {
    const { data } = await customFetch.get("/bookings/doctor");
    console.log(data);
    return data;
  };
  

const DoctorSession = () => {

    const user = useDashboardContext();
    const { doctorBookings, hospitals, bookedByUsers } = useLoaderData();



    const [selectedHospital, setSelectedHospital] = useState('');
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const [currentDay, setCurrentDay] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [countdownText, setCountdownText] = useState('');
    const [showDetails, setShowDetails] = useState(false); // To show details when a hospital is selected
    const [hospitalName, setHospitalName] = useState(""); // To store the selected hospital's name
      const [todaysBooking, setTodaysBookings] = useState();
      const [hospital,setHospital] = useState([]);
      const [passingData,setPassingData] = useState();
      const [ready,setReady] = useState(false)
  
    const handleHospitalSelect = (event) => {
      const selectedHospitalId = event.target.value;
  
  
      const selectedHospitalInfo = hospitals.find(hospital => hospital._id === selectedHospitalId);
  
      setHospital(selectedHospitalInfo)
  
      setSelectedHospital(selectedHospitalId);
  
      calculateCountdown(selectedHospitalId);
      setShowDetails(true); // Show details when a hospital is selected
    };

    const extractTimeFromISOString = (isoString) => {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
      };
  
    const calculateCountdown = (hospitalId) => {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      if (hospitalId && currentDay) {
        const doctorBooking = doctorBookings.filter(
          (booking) => booking.hospitalId === hospitalId &&
                        dayNames[new Date(booking.schedule).getDay()] === currentDay
        );
            console.log(doctorBookings)
          setTodaysBookings(doctorBooking); 
  
        if (doctorBooking[0]) {
          const startTime = extractTimeFromISOString(doctorBooking[0].schedule);
          setSessionStartTime(startTime);

   // Function to get the current time in HH:mm AM/PM format

  
  
  // Compare the current time to the start time
  if (startTime <= getCurrentTime2()) {
    // If the current time is greater than or equal to the start time, set ready to true
    setReady(true);
  } else {
    // Otherwise, set ready to false
    setReady(false);
  }
  
  console.log(startTime, getCurrentTime2());
  

  
          // Start countdown
          const intervalId = setInterval(() => {
            const timeRemaining = calculateTimeRemaining(startTime);
            setCountdownText(`Session starts in ${timeRemaining}`);
          }, 1000);
          

          // Clean up the interval when the component unmounts
          return () => clearInterval(intervalId);
        } else {
          console.log('No booking found for the selected hospital and day');
          setSessionStartTime(null);
          setCountdownText('Session time not available');
        }
      }
    };
    const getCurrentTime2 = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
      };
      
    const navigate = useNavigate();
    const handleStartSession = () => {
      // Handle starting the session here
      const timeRemaining = calculateTimeRemaining(sessionStartTime);
      console.log(sessionStartTime,getCurrentTime2())
      // if (selectedHospital && sessionStartTime <= getCurrentTime2()) {
  
          const usersArr = todaysBooking.map((booking) => {
              const foundUser = bookedByUsers.find((user) => booking.bookedBy === user._id);
              const foundHospital = hospitals.find((hospital) => booking.hospitalId === hospital._id)
              const data = { foundUser, foundHospital, booking };
              return data; // Return the found user or undefined if not found
            });
            
            const usersArrJSON = JSON.stringify(usersArr); // Serialize the array to JSON
            
            navigate(`/dashboard/daily-sessions/appointmentreport?usersArr=${encodeURIComponent(usersArrJSON)}`);
            
      //     const data = [hospital];
  
      //  todaysBooking.map(booking)
  
  
      //     setPassingData()
  
      console.log(hospital)
  
          toast.success(`Session Started`) 
  
  
        // Start the session
        // You can add your logic here to start the session
        // Instead of alert, you can update the button text to indicate the session has started
        // For example:
        // setSessionStarted(true);
    //   // } else {
    //       // Calculate the time remaining for session start
    //  timeRemaining? toast.error(`Session starts in ${timeRemaining}`) : toast.error('Sesson has Already Started!!')
    //     // Update the button text with the countdown
    //     setCountdownText(`Session starts in ${timeRemaining}`)
        
    //   }
    };
  
    useEffect(() => {
      const currentDate = new Date();
      setCurrentDay(currentDate.toLocaleDateString('en-US', { weekday: 'long' }));
      setCurrentTime(
        currentDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, []);

  
    const calculateTimeRemaining = (startTime) => {
        if (!startTime) {
          return 'Session time not available';
        }
      console.log(startTime)
        const now = new Date();
        const startTimeParts = startTime.split(':');
        const startHours = parseInt(startTimeParts[0], 10);
        const startMinutes = parseInt(startTimeParts[1], 10);
        const startMillis = startHours * 3600 * 1000 + startMinutes * 60 * 1000;
        const currentMillis = now.getHours() * 3600 * 1000 + now.getMinutes() * 60 * 1000 + now.getSeconds() * 1000;
        const timeRemainingMillis = startMillis - currentMillis;
      
        if (timeRemainingMillis <= 0) {
          return null;
        }
        
        const minutesRemaining = Math.floor((timeRemainingMillis / 1000) / 60);
        const secondsRemaining = Math.floor((timeRemainingMillis / 1000) % 60);
console.log(startMillis,currentMillis,timeRemainingMillis,secondsRemaining);
        return `${minutesRemaining} minutes and ${secondsRemaining} seconds`;
      };
      
 
  
    if (!doctorBookings || !bookedByUsers) {
        return (
          <Container>
            <Heading> Hi, {user.user.name}. Here are your Daily Sessions</Heading>
            <div>
              <BookingList>
                <BookingItem>
                  <BookingInfo>
                    <IconContainer>
                      <FaCalendar />
                    </IconContainer>
                    No sessions available today.
                  </BookingInfo>
                </BookingItem>
              </BookingList>
            </div>
          </Container>
        );
      }
          
      
      
console.log(ready)
  return (
    <>
      <Container>
        <Heading>Doctor's Daily Session</Heading>
        <SelectHospital onChange={handleHospitalSelect}>
        <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital._id} value={hospital._id}>
              {hospital.hospital}
            </option>))}
        </SelectHospital>
          {showDetails && selectedHospital && sessionStartTime != null && (
        <div>
            <StartButton onClick={handleStartSession} >
              <FaPlay />
              {!ready ? `Session Starts in ${calculateTimeRemaining(sessionStartTime)}` : "Start Session"}
            </StartButton>
       
          <BookingList>
            <BookingItem>
              <BookingInfo>
                <IconContainer>
                  <FaCalendar />
                </IconContainer>
                Total Appointments for today:
                <TotalAppointments>{todaysBooking.length}</TotalAppointments>
              </BookingInfo>
            </BookingItem>
          </BookingList>
        </div>
        )}
      </Container>
    </>
  );
};

export default DoctorSession;
