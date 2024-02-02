import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaCalendar, FaStethoscope, FaEdit, FaCheck, FaPrescriptionBottleAlt, FaFileSignature } from 'react-icons/fa';
import customFetch from '../utils/customFetch';
import { Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDashboardContext } from './DashboardLayout';
import dayjs from 'dayjs';

const colors = {
  background: 'var(--background-color)',
  text: 'var(--primary-500)',
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
`;

const FormContainer = styled.div`
  background-color: var(--background-secondary-color);
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  width: 200rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: var(--text-color);
  font-size: 18px;
`;

const Input = styled.input`
  padding: 12px;
  background-color: var(--background-color);
  border: 1px solid rgb(40 160 186);
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  grid-column: span 2;
  padding: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  font-size: 18px;
  margin-bottom: 10px;
  width: 100%;
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: var(--primary-600);
  color: #fff;
  border: none;
  padding: 15px 30px;
  margin-top: 20px;
  align-self: flex-end;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;


  &:disabled {
    background-color: #ccc; /* Change the background color to a muted gray */
    color: #999; /* Change the text color to a lighter gray */
    cursor: not-allowed; /* Change the cursor to not-allowed to indicate it's disabled */
  }
  &:not(:disabled):hover {
    background-color: var(--primary-900);
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  font-size: 24px;
`;

const Title = styled.h2`
  font-size: 34px;
  margin-bottom: 20px;
  text-align: center;
  color: ${colors.text};
`;

const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
  color: ${colors.text};
`;

const Spacer = styled.div`
  height: 20px;
`;

const SectionHeader = styled.h4`
  font-size: 20px;
  color: ${colors.text};
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Section = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

const AppointmentForm = () => {
  const { user } = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([]);
  const [finish, setFinish] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const location = window.location;
    const queryParams = new URLSearchParams(location.search);
    const usersArrJSON = queryParams.get('usersArr');
    const usersArr = await JSON.parse(decodeURIComponent(usersArrJSON));
    setData(usersArr);
    let data = usersArr;
    setFormData({
      _id: `${data[0].booking._id}`,
      hospitalName: `${data[0].foundHospital.hospital}`,
      hospitalType: `${data[0].foundHospital.hospitalType}`,
      hospitalLocation: `${data[0].foundHospital.hospitalLocation}`,
      patientName: `${data[0].foundUser.name} ${data[0].foundUser.lastName}`,
      patientEmail: `${data[0].foundUser.email}`,
      doctorName: `${user.name} ${user.lastName}`,
      doctorEmail: user.email,
      appointmentDate: `${getDate(data[0].booking.schedule)}`,
      symptoms: '',
      diagnosis: '',
      appointmentNumber: `${data[0].booking.applicantNumber}`,
      treatmentPlan: '',
      medicines: '',
      details: '',
      signatureDate: '',
      doctorSignatureDate: '',
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (data.length<=1) {
      const response = await customFetch.patch(`/bookings/generate-report/${formData._id}`, formData).finally(()=>  setIsSubmitting(false));
      toast.success("Completed Today's Session.");
      navigate("/dashboard/daily-sessions");
      
    } else {
      let arr = data;
      try {
        setIsSubmitting(true);
        const response = await customFetch.patch(`/bookings/generate-report/${formData._id}`, formData);
        arr.shift();
        setData(arr);
        const usersArrJSON = JSON.stringify(arr);
        navigate(`/dashboard/daily-sessions/appointmentreport?usersArr=${encodeURIComponent(usersArrJSON)}`);

        if (arr.length === 1) {
          setFinish(true);
        }

        toast.success(response.data.message);
        return data;
      } catch (error) {
        toast.error(error.response.message);
        console.error(error);
        return error;
      } finally {
        setIsSubmitting(false);
        toast.success("Successfully Loaded Another Applicant");
      }
    }
  };

  const [formData, setFormData] = useState({
    _id: ``,
    hospitalName: ``,
    hospitalType: ``,
    hospitalLocation: ``,
    patientName: ``,
    patientEmail: ``,
    doctorName: ``,
    doctorEmail: "",
    appointmentDate: ``,
    symptoms: '',
    diagnosis: '',
    appointmentNumber: ``,
    treatmentPlan: '',
    medicines: '',
    details: '',
    signatureDate: '',
    doctorSignatureDate: '',
  });

  const getDate = (schedule) => {
    const formattedDate = dayjs(schedule).format('MMMM D, YYYY, h:mm A');
    return formattedDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAbsent = async (e,id) => {
    e.preventDefault();
    let arr = data;
    try {
      setIsSubmitting(true);
      const obj = {
        email:formData.patientEmail
      }
      await customFetch.patch(`/absent/report/${id}`,obj);
      arr.shift();
      setData(arr);
      const usersArrJSON = JSON.stringify(arr);
      navigate(`/dashboard/daily-sessions/appointmentreport?usersArr=${encodeURIComponent(usersArrJSON)}`);
     await getData();
     setData(arr);
    } catch (error) {
      toast.error(error);
    }
    finally{
      toast.success('Absent Reported!!')
      setIsSubmitting(false);
    }
  } 
  const handleSkip = async (e) => {
    e.preventDefault();
  setIsSubmitting(true);
    if (data.length > 1) {
      let arr = data;
      const skippedApplicant = arr.shift();
      arr.push(skippedApplicant);
  
      try {
        // Use navigate here to navigate to the next applicant's report
        await navigate(`/dashboard/daily-sessions/appointmentreport?usersArr=${encodeURIComponent(JSON.stringify(arr))}`);
        
        // Update the form data with the new patient's name
        console.log(arr[0].foundUser.name)
        setFormData({
          ...formData,
          patientName: `${arr[0].foundUser.name} ${arr[0].foundUser.lastName}`,
        });
  
        // Re-fetch data for the next applicant
        await getData();
        
        // Update the state after navigating and fetching data
        setData(arr);
  
      } catch (error) {
        toast.error(error.response.message);
      } finally {
        toast.success("Patient Skipped!");
        setIsSubmitting(false);
      }
    } else {
      // Handle the case where there's only one applicant left or no applicants.
      // You may want to display a message or take appropriate action.
      toast.error("No more applicants to skip or only one applicant left.");
    }
  };
  
  
  
  

  if (!data[0]) {
    return <h1>You don't have remaining Sessions.</h1>;
  }

  return (
    <Container>
      <FormContainer>
        <Title>Medical Report Form</Title>
        <Form onSubmit={handleSubmit}>
          <Subtitle>Patient Details</Subtitle>
          <FormGroup>
            <Label>
              <Icon>
                <FaUser />
              </Icon>
              Patient Name:
            </Label>
            <Input
              type="text"
              name="patientName"
              value={`${data[0].foundUser.name} ${data[0].foundUser.lastName}`}
              onChange={handleChange}
              disabled
            />
            <Input
              type="text"
              name="_id"
              value={data[0].booking._id}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="hospitalName"
              value={data[0].foundHospital.hospital}
              onChange={handleChange}
              hidden
            />
            <Input
              type="text"
              name="hospitalLocation"
              value={data[0].foundHospital.hospitalLocation}
              onChange={handleChange}
              hidden
            />
            <Input
              type="text"
              name="hospitalType"
              value={data[0].foundHospital.hospitalType}
              onChange={handleChange}
              hidden
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <Icon>
                <FaCalendar />
              </Icon>
              Patient Email:
            </Label>
            <Input
              type="text"
              name="patientEmail"
              value={data[0].foundUser.email}
              onChange={handleChange}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <Icon>
                <FaUser />
              </Icon>
              Applicant No:
            </Label>
            <Input
              type="text"
              name="applicantNumber"
              value={data[0].booking.applicantNumber}
              onChange={handleChange}
              disabled
            />
          </FormGroup>
          <Spacer />
          <Subtitle>Doctor Details</Subtitle>
          <FormGroup>
            <Label>
              <Icon>
                <FaUser />
              </Icon>
              Doctor Name:
            </Label>
            <Input
              type="text"
              name="doctorName"
              value={`${user.name} ${user.lastName}`}
              onChange={handleChange}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <Icon>
                <FaEnvelope />
              </Icon>
              Doctor's Email:
            </Label>
            <Input
              type="email"
              name="doctorEmail"
              value={user.email}
              onChange={handleChange}
            />
          </FormGroup>
          <Spacer />
          <Subtitle>Medical Assessment</Subtitle>
          <FormGroup>
            <Label>
              <Icon>
                <FaCalendar />
              </Icon>
              Appointment Date:
            </Label>
            <Input
              type="text"
              name="appointmentDate"
              value={getDate(data[0].booking.schedule)}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <Icon>
                <FaEdit />
              </Icon>
              Symptoms:
            </Label>
            <TextArea
              name="symptoms"
              value={data[0].booking.issueDescription}
              onChange={handleChange}
            />
          </FormGroup>
          <Section>
            <SectionHeader>Diagnosis Report</SectionHeader>
            <FormGroup>
              <Label>
                <Icon>
                  <FaFileSignature />
                </Icon>
                Diagnosis:
              </Label>
              <TextArea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <Icon>
                  <FaEdit />
                </Icon>
                Treatment Plan:
              </Label>
              <TextArea
                name="treatmentPlan"
                value={formData.treatmentPlan}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <Icon>
                  <FaPrescriptionBottleAlt />
                </Icon>
                Medicines:
              </Label>
              <TextArea
                name="medicines"
                value={formData.medicines}
                onChange={handleChange}
              />
            </FormGroup>
          </Section>
          <Section>
            <SectionHeader>Additional Notes</SectionHeader>
            <FormGroup>
              <Label>
                <Icon>
                  <FaEdit />
                </Icon>
                Additional Notes:
              </Label>
              <TextArea
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </FormGroup>
          </Section>
          <FormGroup>
            <Label>
              <Icon>
                <FaFileSignature />
              </Icon>
              Signature Date:
            </Label>
            <Input
              type="date"
              name="signatureDate"
              value={formData.signatureDate}
              onChange={handleChange}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Label>
              <Icon style={{ marginTop: "20px" }}>
                <FaFileSignature />
              </Icon>
              Doctor's Signature Date:
            </Label>
            <Input
              type="date"
              name="doctorSignatureDate"
              value={formData.doctorSignatureDate}
              onChange={handleChange}
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={isSubmitting}>
            <Icon>
              <FaCheck />
            </Icon>
            {isSubmitting ? 'Generating... and Loading Next Applicant' : 'Generate PDF and move to the next applicant'}
          </SubmitButton>
          <SubmitButton type="button" disabled={isSubmitting} onClick={(e)=>handleAbsent(e,data[0].booking._id)}>
            <Icon>
              <FaCheck />
            </Icon>
           {isSubmitting? "Submitting Absent Report..." :  "Report Absent"} 
          </SubmitButton>
          <SubmitButton type="button" disabled={isSubmitting} onClick={handleSkip}>
            <Icon>
              <FaCheck />
            </Icon>
            {isSubmitting? "Skipping..." :  "Skip"} 
          </SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AppointmentForm;
