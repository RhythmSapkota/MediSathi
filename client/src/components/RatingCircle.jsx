import React, { useState } from 'react';

const RatingCircle = ({ averageRating, onUpdateRating }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRating, setNewRating] = useState(averageRating);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNewRating(value);
  };

  const handleRatingSubmit = () => {
    onUpdateRating(newRating);
    setIsPopupOpen(false);
  };

  return (
    <div className="rating-circle">
      <div className="circle" onMouseEnter={togglePopup} onMouseLeave={togglePopup}>
        {averageRating}
      </div>
      {isPopupOpen && (
        <div className="rating-popup">
          <input
            type="number"
            value={newRating}
            min={1}
            max={5}
            step={0.1}
            onChange={handleRatingChange}
          />
          <button onClick={handleRatingSubmit}>Update Rating</button>
        </div>
      )}
    </div>
  );
};

export default RatingCircle;
