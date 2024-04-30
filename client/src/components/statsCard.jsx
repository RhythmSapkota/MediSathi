import React from 'react'
import { FaUsers } from "react-icons/fa";
import styled from 'styled-components';
import chroma from 'chroma-js';

// Correct styled component declaration
const Card = styled.div`
  background: var(--background-secondary-color);
  padding: 2rem;
  border-radius:1rem;
  width:100%;
  height:100%;
  .header{
    display:flex;
    justify-content: space-between;

    h4{
        margin-bottom: 1rem;
        font-weight: 500;
        font-size: 1.4rem;
    }
  }
  .contents{
    p{
        margin-bottom: 1rem;
        font-size: 2rem;
        font-weight: 500;
        color: var(--text-secondary-color)
    }
    span{
        margin-bottom: 1rem;
        font-weight: 500;
        color: var(--text-secondary-color)
    }
  }
`;

const StatsCard = ({title, content, footer,icon,color}) => {
  const lightColor = chroma(color).brighten(2).hex();
  const darkColor = chroma(color).darken(0.4).hex();
  return (
    <Card>
      <div className='header'>
        <h4>{title}</h4>
        <div style={{background: lightColor, color: darkColor, display:'flex', alignItems:"center", padding:"0.7rem", borderRadius:"20%"}}>
         {icon}
        </div> 
      </div>
      <div className='contents'>
        <p>{content}</p>
        <span>{footer}</span>
      </div>
    </Card>
  );
};

export default StatsCard;
