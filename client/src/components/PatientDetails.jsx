import React from 'react';
import styled from 'styled-components';
import { FaUser, FaCalendar } from 'react-icons/fa';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  font-size: 18px;
  width: 100%;
`;
const Icon = styled.span`
  margin-right: 10px;
`;

const PatientDetails = ({ formData, handleChange }) => {
  return (
    <>
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
          value={formData.patientName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Icon>
            <FaCalendar />
          </Icon>
          Date of Birth:
        </Label>
        <Input
          type="date"
          name="patientDOB"
          value={formData.patientDOB}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Icon>
            <FaUser />
          </Icon>
          Gender:
        </Label>
        <Input
          type="text"
          name="patientGender"
          value={formData.patientGender}
          onChange={handleChange}
        />
      </FormGroup>
    </>
  );
};

export default PatientDetails;
