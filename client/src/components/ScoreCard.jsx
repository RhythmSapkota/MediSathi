import React from 'react';
import styled from 'styled-components';

const StarIcon = styled.div`
  position: relative;
  width: 2rem;
  height: 3rem;
  margin-left:9rem;
  display: inline-block;

`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const RatingText = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const ScoreCard = ({ rating }) => {
  return (
    <StarRating>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"0.3rem",fontSize:"1.2rem"}}><span style={{color:"gold", marginRight:"0.5rem"}}>★</span>
      <RatingText>{rating.toFixed(1)}</RatingText>
      </div>
    </StarRating>
  );
};

export default ScoreCard;
