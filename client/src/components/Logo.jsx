import React from 'react';
import logo from '../assets/images/logo.png';
import logoDark from '../assets/images/logoDark.png'

const Logo = () => {
  const checkDefaultTheme = () =>{
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme',isDarkTheme)
  return isDarkTheme;
  };

  
  return <>{checkDefaultTheme()? <img src={logoDark} alt="Xpera TV" className="logo" width= "300px" height="100px"/>:
  <img src={logo} alt="Xpera TV" className="logo" width= "300px" height="100px"/>
  }</>
  }

export default Logo;