import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  .admin-page {
    max-width: 70rem;
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;

    h3 {
      text-align: center; /* Center the text within .admin-page */
    }
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
    }
    .admin-page {
      margin-left: 1rem;
      max-width: 100rem;
      width: 75rem;
      h3 {
        text-align: center; /* Center the text within .admin-page on larger screens */
      }
    }
  }
`;

export default Wrapper;
