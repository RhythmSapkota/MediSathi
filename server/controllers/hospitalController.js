import { UnauthorizedError } from "../errors/customErrors.js";
import Hospital from "../modals/hospitalModal.js";
import { StatusCodes } from "http-status-codes";


export const getAllHospitals = async (req, res) => {
const queries = req.query
  try {
    const hospitalsWithRatings = await (queries?.location
      ? Hospital.find({ hospitalLocation: queries.location }).populate('ratings').exec()
      : Hospital.find().populate('ratings').exec());
  
    const hospitalsData = hospitalsWithRatings.map((hospital) => ({
      _id: hospital._id,
      hospital: hospital.hospital,
      doctors:hospital.doctors,
      hospitalType:hospital.hospitalType,
      hospitalLocation: hospital.hospitalLocation,
      createdBy:hospital.createdBy,
      createdAt:hospital.createdAt,
      updatedAt:hospital.updatedAt,
      ratings:hospital.ratings,
      averageRating: calculateAverageRating(hospital.ratings),
    }));

    res.status(StatusCodes.OK).json({ hospitals: hospitalsData });
  } catch (error) {
    console.error('Error fetching hospitals with ratings:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
  }
};

// Function to calculate average rating from an array of ratings
function calculateAverageRating(ratings) {
  if (!ratings || ratings.length === 0) {
    return 0;
  }
  
  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return totalRating / ratings.length;
}


export const addHospital = async (req, res) => {
  req.body.createdBy = req.user.userId;
 if (req.user.role === "admin"){
  try {
    const hospital = await Hospital.create(req.body);
    res.status(StatusCodes.CREATED).json({ hospital });
  } catch (error) {
    console.error('Error adding hospital:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
  }
 } throw new UnauthorizedError("Unauthorized!!")

};


export const getSingleHospital = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findById(id);
  res.status(StatusCodes.OK).json({ hospital });
};


export const deleteHospital = async (req, res) => {
  const { id } = req.params;
  const Singlehospital = await Hospital.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: " hospital Deleted", hospital: Singlehospital });
};


export const updateHospital = async (req, res) => {
  const { id } = req.params;
  const user = req.user.userId;
  const newRatingValue = req.body.ratings;

  try {
    // Find the hospital by ID
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Hospital not found" });
    }

    if (newRatingValue !== undefined) {
      // Validate that the new rating value is within the 1 to 5 range
      if (newRatingValue < 1 || newRatingValue > 5) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Invalid rating value. Ratings must be between 1 and 5." });
      }

      // Find the index of the existing rating for the same user
      const existingRatingIndex = hospital.ratings.findIndex(
        (rating) => rating.userId.toString() === user.toString()
      );

      if (existingRatingIndex !== -1) {
        // If the user has an existing rating, update it
        hospital.ratings[existingRatingIndex].rating = newRatingValue;
      } else {
        // If the user doesn't have an existing rating, add a new one
        hospital.ratings.push({
          userId: user,
          rating: newRatingValue,
        });
      }
    } else {
      // If the request is not for updating the rating, update the hospital details
      hospital.set(req.body); // Update the hospital details
    }

    // Save the updated hospital
    const updatedHospital = await hospital.save();

    // Calculate the average rating for the updated hospital
    const averageRating = updatedHospital.calculateAverageRating();

    // Limit the average rating to a whole number (1 to 5)
    const roundedAverageRating = Math.min(5, Math.max(1, Math.round(averageRating)));

    res
      .status(StatusCodes.OK)
      .json({ msg: "Hospital modified", updatedHospital, averageRating: roundedAverageRating });
  } catch (error) {
    console.error('Error updating hospital:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
};
