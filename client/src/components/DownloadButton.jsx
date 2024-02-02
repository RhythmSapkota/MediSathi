import React from 'react';
import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Define your styled button component
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

const DownloadButton = ({bookingId}) => {
    const handleClick = async (e) => {
        e.preventDefault();
        console.log("here");
        try {
            const response = await customFetch.get(`/booking/pdf/${bookingId}`);

            if (!response || !response.data) {
                // Handle the case where the response is missing or empty
                console.error('Error downloading PDF. Response:', response);
                toast.error("Download failed");
                return;
            }

            // Convert the response data to a blob
             // Create a blob from the PDF data
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    console.log('PDF Data Length:', response.data.length);
    console.log('PDF Data:', response.data.slice(0, 100)); // Log the first 100 bytes as an example


    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(pdfBlob);

    // Create a temporary link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Your_Report.pdf'; // Set the desired filename
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the blob URL
    window.URL.revokeObjectURL(url);

            toast.success("Download completed");
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast.error("Download failed");
        }
    };
      
      
  return (
    <div>
      <StyledButton type='button' onClick={handleClick}>Download PDF</StyledButton>
    </div>
  );
};

export default DownloadButton;
