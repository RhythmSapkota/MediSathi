import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaCalendarDay,
  FaHospital,
  FaStethoscope,
  FaCalendarCheck,
  FaUserMd,
  FaComment,
  FaPaperPlane,
} from "react-icons/fa";

import {
  BookingForm,
  Title,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  Icon,
  Wrapper,
} from "../assets/wrappers/Booking.js"; // Replace 'path-to-your-file' with the actual file path where you defined these components.

import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { IoArrowBackCircleSharp, IoArrowBackSharp } from "react-icons/io5";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/doctors/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error);
    // You can handle the error here, e.g., redirect or display an error message.
    return null;
  }
};

export const action = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data, "action", formData);
    await customFetch.post('/bookings',data);
    toast.success(`Booking Successful`);
    return redirect('/dashboard/profile/mybookings')
  } catch (error) {
    // Handle errors if needed
    toast.error(error.response.data.error)
    console.error(error);
    return new Response("Error occurred while submitting the form", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};

// Your Component
const Booking = () => {
  const { hospital, seletedDoctor } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const hospitals = hospital;

  const [doctor, setDoctor] = useState(...seletedDoctor);
  const [selectedHospitalName, setSelectedHospitalName] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [SelectedSchedule, setSelectedSchedule] = useState();
  const [selectedHospitalId, setSelectedHospitalId] = useState("");

  const handleHospitalChange = (e) => {
    e.preventDefault();
    const selectedHospitalId = e.target.value;

    setSelectedHospitalId(e.target.value);

    // Find the selected hospital
    const selectedHospital2 = hospitals.find(
      (hospital) => hospital._id === selectedHospitalId
    );

    if (selectedHospital2) {
      setSelectedHospital(selectedHospital2);

      // Set the selected hospital name here
      setSelectedHospitalName(selectedHospitalId);

      // Find the doctor associated with the selected hospital
      const selectedDoctor = selectedHospital2.doctors.find(
        (doctor) => doctor._id === seletedDoctor[0]._id
      );

      if (selectedDoctor) {
        setSelectedSchedule(selectedDoctor.schedule);
      }
    }
  };

  return (
    <Wrapper>
      <Link to={"/dashboard"} className="back-button">
        {" "}
        <IoArrowBackCircleSharp size={30} />{" "}
        <span style={{ fontSize: "40px" }}>Back</span>{" "}
      </Link>
      <BookingForm>
        <Form method="post">
          <Title>
            <Icon style={{ margin: "1.5rem" }}>
              <FaCalendarAlt />
            </Icon>
            Book an Appointment
          </Title>
          <FormGroup>
            <Label>
              <Icon>
                {" "}
                <FaHospital />
              </Icon>{" "}
              Hospital Name:
            </Label>
            <Select
              name="hospitalName"
              value={selectedHospitalName}
              onChange={(e) => handleHospitalChange(e)}
              required
            >
              <option value={""}>Select a Hospital</option>
              {hospitals.map((hospital, index) => (
                <option key={index} value={hospital._id}>
                  {hospital.hospital}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <Icon>
                <FaUserMd />
              </Icon>{" "}
              Doctor Name:
            </Label>
            <Input
              name="doctorName"
              type="text"
              defaultValue={`${doctor.name} ${""} ${doctor.lName}`}
              disabled
            />
            <Input
              name="hospitalId"
              type="text"
              defaultValue={selectedHospitalId}
              hidden
            />
            <Input
              name="doctorId"
              type="text"
              defaultValue={doctor._id}
              hidden
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Icon>
                <FaCalendarCheck />
              </Icon>
              {""} Select Date:
            </Label>
            <Select
              name="schedule"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            >
              <option value="">Select a Date</option>
              {SelectedSchedule
  ? Object.keys(SelectedSchedule).map((day) => {
      // Parse the date string to create a JavaScript Date object
      const date = new Date(SelectedSchedule[day].date);
      const time = SelectedSchedule[day].startTime;
      console.log(SelectedSchedule[day]) // Assuming schedule.startTime contains the time


      console.log(date, date);
      // Combine date and time to create a full DateTime string
      const dateTimeString = `${date.toISOString().split('T')[0]}T${time}`;

      return (
        <option key={day} value={dateTimeString}>
          {SelectedSchedule[day].date} {time}
        </option>
      );
    })
  : null}

            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <Icon>
                {" "}
                <FaComment />{" "}
              </Icon>
              {""} Describe Your Issue:
            </Label>
            <textarea
              name="issueDescription"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your issue description here..."
              required
            />
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            <FaPaperPlane />

            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </Form>
      </BookingForm>
    </Wrapper>
  );
};

export default Booking;
