import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  h5{
    font-weight:bold;
    font-size:25px;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .rating {
    display: inline-block;
    margin-top:10px;
    direction: rtl; /* Reverse direction */

    .rating-indo-inside{
      display: inline;
      @media (max-width: 480px) {
        display:none 
       }
    }

  }
  
  .star {
    color: 	#cfa42d;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.2s; /* Add transition for smooth color change */
  }
  
  .star:hover,
  .star:hover ~ .star {
    color: gold; /* Change color to gold on hover and stars to its right */
  }
  
  .empty {
    color: lightgray; /* Color for empty stars */
  }
  .profile-image img {
    width: 220px;
    height: 210px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;

  }
  .profile-image{
    margin-left:auto;
  }
  
  .rating-info {
    margin-bottom: 5px;
    font-weight: bold;
    @media (min-width: 576px) {
     display:none 
    }
  }
  
  
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }

`;

export default Wrapper;
