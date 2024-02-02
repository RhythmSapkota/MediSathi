import Booking from "../modals/bookingModal.js";
import User from '../modals/userModal.js'; // Import the User model
import Hospital from '../modals/hospitalModal.js'; // Import the Hospital model
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import { startOfDay, endOfDay, isSameDay } from 'date-fns'; // Import date-fns functions

export const createBooking = async (req, res) => {
  try {
    const { hospitalId, doctorId, schedule, issueDescription } = req.body;
    const bookedBy = req.user.userId;

    // Check if there is a pending booking by the same user with the same doctor
    const existingPendingBooking = await Booking.findOne({
      DoctorId: doctorId,
      bookedBy: bookedBy,
      applicationStatus: "Pending",
    });

    if (existingPendingBooking) {
      return res.status(400).json({
        error: "You already have a pending booking with this doctor.",
      });
    }

    // Check if the doctor has less than 20 bookings for the specified date
    const bookingDate = new Date(schedule);
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);

    const doctorBookingsCount = await Booking.countDocuments({
      DoctorId: doctorId,
      schedule: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (doctorBookingsCount >= 20) {
      return res.status(400).json({ error: "Doctor is fully booked for this date." });
    }

    const bookings = await Booking.find();
    let applicantNumber;

    if (bookings.length >= 1 && doctorBookingsCount >= 1) {
      if (bookings[doctorBookingsCount - 1] && bookings[doctorBookingsCount - 1].applicantNumber !== undefined) {
        applicantNumber = bookings[doctorBookingsCount - 1].applicantNumber + 1;
      } else {
          applicantNumber = 1;
      }
    } else {
     applicantNumber = 1;
    }
    

    const booking = new Booking({
      hospitalId,
      DoctorId: doctorId,
      schedule,
      issueDescription,
      bookedBy,
      applicationStatus: "Pending",
      applicantNumber: applicantNumber, // Save the applicant number
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create booking" });
  }
};

  
  
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch bookings" });
  }
};


 // Import the Doctor model
 export const getAllUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userBookings = await Booking.find({ bookedBy: userId })
      .populate({
        path: 'bookedBy',
        model: User,
        select: 'name lastName email',
      })
      .populate({
        path: 'hospitalId',
        model: Hospital,
        select: 'hospital',
      })
      .populate({
        path: 'DoctorId',
        model: User,
        select: 'name lastName email',
      });

    // Check if any booking has a null DoctorId and remove it from the result
    const filteredBookings = userBookings.filter((booking) => booking.DoctorId !== null);

    res.status(200).json(filteredBookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Could not fetch user bookings' });
  }
};


  
  export const getAllDoctorsBookings = async (req, res) => {
    if (req.user.role !== 'doctor') throw new UnauthorizedError("Unauthorized to access");

    // if (!req.body) {
    //   // 
    // }
    try {
      console.log(req.user);
      const doctorId = req.user.userId;
  
      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      const application_STATUS = "Pending" 
      
      const doctorBookings = await Booking.find({
        DoctorId: doctorId,
        schedule: {
          $gte: today,      // Find bookings greater than or equal to the start of today (midnight)
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // And less than the start of the next day (midnight)
        },
        $or: [{applicationStatus:"Pending"},{applicationStatus:"Follow_Up"}]

      });

  
      if (doctorBookings.length === 0) {
        return res.status(204).send(); // No Content - No bookings for today
      }
  
      // Create an array to store hospital IDs and bookedBy user IDs
      const hospitalIds = [];
      const bookedByUserIds = [];
      
      // Sort the doctorBookings array based on the applicantNumber
    doctorBookings.sort((a, b) => a.applicantNumber - b.applicantNumber);

// Now, the doctorBookings array is sorted by applicantNumber in ascending order

      // Extract hospital IDs and bookedBy user IDs from the bookings
      doctorBookings.forEach((booking) => {
        hospitalIds.push(booking.hospitalId);
        bookedByUserIds.push(booking.bookedBy);
      });

      const hospitals = await Hospital.find({ _id: { $in: hospitalIds } });
  
      // Find users using the bookedBy user IDs
      const bookedByUsers = await User.find({ _id: { $in: bookedByUserIds } });
  
      res.status(200).json({
        doctorBookings: doctorBookings,
        hospitals: hospitals,
        bookedByUsers: bookedByUsers,
      });
    } catch (error) {
      res.status(500).json(error.msg ? { msg: error.msg } : { error: 'Could not fetch doctor bookings' });
    }
  };
   
  
  export const getAllHospitalBookings = async (req, res) => {
    try {
      const hospitalId = req.params.hospitalId;
      const hospitalBookings = await Booking.find({ hospitalId: hospitalId });
      res.status(200).json(hospitalBookings);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch hospital bookings' });
    }
  };