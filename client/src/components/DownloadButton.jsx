/* eslint-disable react/prop-types */

import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { generatePdf, getFileNameFromResponse } from "../utils/manupulateFileResponse";
const StyledButton = styled.button`
  background-color: #007bff; /* Blue color for the button */
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const DownloadButton = ({ bookingId }) => {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("here");
    try {
      const response = await customFetch.get(`/booking/pdf/${bookingId}`);
      if (!response || !response.data) {
        // Handle the case where the response is missing or empty
        console.error("Error downloading PDF. Response:", response);
        toast.error("Download failed");
        return;
      }
      const base64 = response?.data.data;
      const fileName = getFileNameFromResponse(response);
      console.log(fileName);
      generatePdf(base64, fileName);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Download failed");
    }
  };

  return (
    <div>
      <StyledButton type="button" onClick={handleClick}>
        Download PDF
      </StyledButton>
    </div>
  );
};

export default DownloadButton;
