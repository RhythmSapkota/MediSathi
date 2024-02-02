import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
    margin-left:0.4rem;
  }
  .logo{
    margin-left:0.4rem;
    width:250px;
  }

  .icon{
    margin-right:1rem;
  }

  .links{
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    white-space:no-wrap;
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: padding-left 0.3s ease-in-out;
    
    &:hover{
      transform: scale(1.1)
    }
  }

  .active {
    color: var(--primary-500);
  }
  .admin-nav{
    display: flex;
    width: 50vw;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }
  @media (max-width: 452px) {
    flex-wrap: wrap;
    .admin-nav {
      justify-content:center;
    }
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
      
    }
    .admin-nav{
      display: flex;
    }
    .active {
      color: var(--primary-500);
    }
    .links{
     width:90vw;
      align-items: center;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      white-space:no-wrap;
      transition: padding-left 0.3s ease-in-out;
    }

    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
export default Wrapper;
