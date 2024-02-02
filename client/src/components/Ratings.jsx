import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ rating, onUpdateRating,totalRating }) => {
  const [userRating, setUserRating] = useState(0);
  const [isUserRated, setIsUserRated] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => {
    setUserRating(rating);
    setIsUserRated(false);
  }, [rating]);

  const stars = [];

  const handleClick = (newRating) => {
    setUserRating(newRating);
    setIsUserRated(true);
    onUpdateRating(newRating);
  };
console.log(message)

  const fullStars = Math.floor(isUserRated ? userRating : rating);
  const hasHalfStar = isUserRated
    ? userRating - fullStars >= 0.5
    : rating - fullStars >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.unshift(
        <FaStar
          key={i}
          className="star"
          onClick={() => handleClick(i)}
          onMouseEnter={()=>{setMessage(ratingHover(i))}}
          onMouseLeave={()=>setMessage("")}
        />
      );
    } else if (hasHalfStar && i === fullStars + 1) {
      stars.unshift(
        <FaStarHalfAlt
          key={i}
          className="star"
          onClick={() => handleClick(i)}
          onMouseEnter={()=>{setMessage(ratingHover(i))}}
          onMouseLeave={()=>setMessage("")}
        />
      );
    } else {
      stars.unshift(
        <FaStar
          key={i}
          className="star empty"
          onClick={() => handleClick(i)}
          onMouseEnter={()=>{setMessage(ratingHover(i))}}
          onMouseLeave={()=>setMessage("")}
        />
      );
    }
  }

  const ratingHover = (i) =>{
    if(i === 1 ){
        return 'Very Poor'
    } else if (i === 2){
        return  'Poor'
    }else if (i === 3){
        return  'Average'
    }else if (i === 4){
        return  'Good'
    }else if (i === 5){
        return  'Excellent'
    }
  }


  const ratingInfo = () => {
    if (userRating >= 4.5) {
      return 'Excellent';
    } else if (userRating >= 3.5) {
      return 'Good';
    } else if (userRating >= 2.5) {
      return 'Average';
    } else if (userRating >= 1.5) {
      return 'Poor';
    } else {
      return 'Very Poor';
    }
  };

  return (
    <div className="rating">
      {/* <div className="rating-info">{message}</div> */}
    {message.length > 0 ? <p style={{display:"inline", marginLeft:"4px",marginBottom:"10px"}}> {message} </p>  : <p style={{display:"inline", marginLeft:"4px",marginBottom:"10px"}}> {`(${totalRating} reviews)`} </p> } {stars}
    </div>
  );
};

export default Rating;
