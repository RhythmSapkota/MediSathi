import React from 'react';
import styled from 'styled-components';
import {
  FaHospital,
  FaCalendar,
  FaEdit,
  FaPrescriptionBottleAlt,
  FaFileSignature,
  FaStethoscope,
} from 'react-icons/fa';

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

const TextArea = styled.textarea`
  grid-column: span 2; /* This will make the TextArea span two columns */
  padding: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  font-size: 18px;
  width: 100%;
  resize: vertical; /* Allow vertical resizing of the TextArea */
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const RestOfFormFields = ({ formData, handleChange }) => {
  return (
    <>
      <FormGroup>
        <Label>
          <Icon>
            <FaHospital />
          </Icon>
          Hospital Name:
        </Label>
        <Input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Icon>
            <FaStethoscope />
          </Icon>
          Hospital Type:
        </Label>
        <Input
          type="text"
          name="hospitalType"
          value={formData.hospitalType}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Icon>
            <FaHospital />
          </Icon>
          Hospital Location:
        </Label>
        <Input
          type="text"
          name="hospitalLocation"
          value={formData.hospitalLocation}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Icon>
            <FaCalendar />
          </Icon>
          Examination Date:
        </Label>
        <Input
          type="date"
          name="examDate"
          value={formData.examDate}
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
          value={formData.symptoms}
          onChange={handleChange}
        />
      </FormGroup>
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
      <FormGroup>
        <Label>
          <Icon>
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
    </>
  );
};

export default RestOfFormFields;
