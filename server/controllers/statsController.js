import express from 'express';
import UserModel from '../modals/userModal.js';
import BookingModel from '../modals/bookingModal.js';
import HospitalModel from '../modals/hospitalModal.js';

export const getAllStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const totalDoctors = await UserModel.countDocuments({ role: "doctor" });

    const totalBookings = await BookingModel.countDocuments();

    const totalDoctorsToday = await UserModel.countDocuments({role:"doctor", createdAt: { $gte: startOfToday, $lt: endOfToday }})

    const totalBookingsToday = await BookingModel.countDocuments({ createdAt: { $gte: startOfToday, $lt: endOfToday } });
    
    const totalHospitals = await HospitalModel.countDocuments();
    
    const totalHospitalsToday = await HospitalModel.countDocuments({ createdAt: { $gte: startOfToday, $lt: endOfToday } });
    const dailyBookings = await BookingModel.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            dayOfWeek: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);
  
      // Create an array to store daily bookings count
      const dailyBookingsCount = new Array(7).fill(0);
      dailyBookings.forEach(dailyBooking => {
        dailyBookingsCount[dailyBooking.dayOfWeek - 1] = dailyBooking.count;
      });

    const statsArr = [
      { title: "Doctors", name: "doctors", content: totalDoctors.toString(), footer: `+${totalDoctorsToday} today`, id: "223", color: "grey" },
      { title: "Bookings", name: "bookings", content: totalBookings.toString(), footer: `+${totalBookingsToday} today`, id: "41234", color: "orange" },
      { title: "Hospitals", name: "hospitals", content: totalHospitals.toString(), footer: `+${totalHospitalsToday} today`, id: "123", color: "#7CB9E8" },
    ];
    
    res.json({statsArr: statsArr, chartData: dailyBookingsCount });
  } catch (error) {
    console.error("Error getting stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

