import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .form-title {
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }


  /* Container styles */
  .form-grid-schedule {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as per your preference */
    gap: 20px; /* Increase or decrease the gap between day containers */
    margin: 20px;
    margin-top:5px;
    padding: 10px;
    justify-content: space-between;
  }

  /* Day container styles */
  .day-container {
    width: 100%; /* Allow day containers to take full width */
    padding: 20px; /* Adjust padding to make them larger */
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin-bottom: 20px; /* Increase or decrease margin between day containers */
  }

  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
  }

  .modal-open {
    display: block;
    animation: fadeIn 0.3s ease-in-out;
  }

  .modal-content {
   
    background-color: red;
    margin: auto;
    border: 1px solid #888;
    border-radius: 5%;
    width: 70%; /* Adjust the width to make it wider */
    max-width: 800px; /* Set a maximum width */
    height: 200px; /* Adjust the height to make it lower */
    max-height: 300px; /* Set a maximum height */
    padding: 20px; /* Add some padding for spacing */
  }

  /* Day header styles */
  .heading-schedule h3 {
    text-align: center;
    margin: 0;
    padding-bottom: 10px;
    font-size: 1.2em;
  }

  /* Date and Time label styles */
  .form-label-schedule {
    margin-bottom: 7px;
    margin-top: 7px;
    font-weight: bold;
    font-family: 'Courier New', monospace;
   color:#d8e9ed;
  }

  /* Date and Time input styles */
  .form-input-schedule {
    width: 100%;
    background-color:grey;
    padding: 5px;
    margin-top: 5px;
    font-weight:600;
    font-size:1.2rem;
    font-family: 'Courier New', monospace;
    border: 1px solid #ccc;
    border-radius: 5px;
    color:var( --text-color);
  }
  .form-btn-schedule-off {
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    width: 400px;
    background-color:#991818;
  }
  .form-btn-schedule-off:hover {
    background-color: #007bff; /* Change the background color on hover */
  }

  .form-input-schedule:hover::before {
    background-color: #007bff; /* Change the background color on hover */
  }
  .form-input-schedule:hover{

    background-color:var(--background-secondary-color);
    
    color:var( --text-secondary-color);
    border-color: #007bff;
  }

  .heading-schedule-main {
    margin: 22px;
    text-align: center;
    font-family: 'Courier New', monospace;
    color:#d8e9ed;
  }
  .heading-schedule h3{
    font-family: 'Courier New', monospace;
    font-size: 2.2REM;
    color: #d8e9ed;
  }

  .heading-schedule h2{
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Courier New', monospace;
  }

  /* Submit button styles */
  .submit-button {
    grid-column: span 3;
    text-align: center;
    margin: auto;
  }

  /* Submit button styles */
  .form-btn-schedule {
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    width: 400px;
  }

  .added-doctors-box {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 20px;
    background-color: var(--background-color);
  }

  .added-doctors-box h5 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .added-doctors-box ul {
    list-style-type: none;
    padding: 0;
  }

  .added-doctors-box li {
    font-size: 14px;
    margin-bottom: 5px;
  }

  /* Submit button hover styles */
  .form-btn-schedule:hover {
    background-color: #0056b3;
  }

  @keyframes fadeIn {
    from {
      opacity: -1;
    }
    to {
      opacity: 3;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
