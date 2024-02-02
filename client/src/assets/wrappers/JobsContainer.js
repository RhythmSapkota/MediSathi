import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  /* Styling for the hospital heading */
.hospital-heading {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 10px; /* Adjust the margin as needed */
}

/* Styling for the back button */
.back-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px; /* Adjust the margin as needed */
}
  .hospital-name{
    margin-bottom:30px;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;
