import React from 'react';
import styled from 'styled-components';
import { FaUser, FaStethoscope } from 'react-icons/fa';

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

const DoctorDetails = ({ formData, handleChange }) => {
  return (
    <>
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
          value={formData.doctorName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Icon>
            <FaStethoscope />
          </Icon>
          Specialty:
        </Label>
        <Input
          type="text"
          name="doctorSpeciality"
          value={formData.doctorSpeciality}
          onChange={handleChange}
        />
      </FormGroup>
    </>
  );
};

export default DoctorDetails;
