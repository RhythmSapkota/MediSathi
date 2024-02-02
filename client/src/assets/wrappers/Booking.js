import styled from "styled-components";

const globalBackgroundColor = "var(--background-color)";
const globalTextColor = "var(--text-color)";
const primaryColor = "var(--primary-500)";

export const Wrapper = styled.div`
.back-button {
    background-color: transparent;
    width:900px;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #007bff;
    margin-bottom: 10px; /* Adjust the margin as needed */
  }
`;

export const BookingForm = styled.div`
  background-color: ${globalBackgroundColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease-in-out;

  // Additional styling for visual appeal
  border: 1px solid ${globalTextColor};



`;

export const Title = styled.h2`
  font-size: 32px;
  margin: 0 0 20px;
  color: ${globalTextColor};
  display: flex;
  align-items: center;

  // Additional styling for visual appeal
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 5px;
  color: ${globalTextColor};
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid ${globalTextColor};
  border-radius: 8px;
  font-size: 18px;
  background-color: ${globalBackgroundColor};
  color: ${globalTextColor};
  &:disabled {
    background-color: ${globalBackgroundColor};
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 2px solid ${globalTextColor};
  border-radius: 8px;
  font-size: 18px;
  background-color: ${globalBackgroundColor};
  color: ${globalTextColor};
`;

export const Button = styled.button`
  background-color: ${primaryColor};
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  margin-top: 2rem;
  margin-left:5rem;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Icon = styled.div`
  display: inline-block;
  font-size: 28px;
  color: ${primaryColor};
  margin-top: 1rem;
`;
