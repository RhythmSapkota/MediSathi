import React from 'react';
import styled from 'styled-components';

const StarIcon = styled.div`
  position: relative;
  width: 2rem;
  height: 3rem;
  margin-left:9rem;
  display: inline-block;

  &::before {
    content: '★';
    font-size: 2rem;
    color: gold;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  color: gold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const RatingText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom:0.8rem;
`;

const ScoreCard = ({ rating }) => {
  return (
    <StarRating>
      <StarIcon />
      <RatingText>{rating.toFixed(1)}</RatingText>
    </StarRating>
  );
};

export default ScoreCard;
