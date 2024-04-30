import { UnauthorizedError } from "../errors/customErrors.js";
import Hospital from "../modals/hospitalModal.js"; 
import { hashPassword } from "../utils/passwordUtils.js";
import generator from "password-generator";
import { sendEmail } from "./emailController.js";
import User from "../modals/userModal.js";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";

// Controller function to get doctors by ID
export const getDoctorsById = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Use Mongoose to find hospitals that have a doctor with the specified ID
    const hospitals = await Hospital.find({
      "doctors._id": doctorId,
    })
      .populate("doctors.bookedBy", "name email") // Populate the 'bookedBy' field with user details
      .exec();

    if (!hospitals || hospitals.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const doctors = [];

    hospitals.forEach((hospital) => {
      hospital.doctors.forEach((doctor) => {
        if (doctor._id.equals(doctorId)) {
          doctors.push(doctor);
        }
      });
    });

    if (doctors.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({ hospital: hospitals, seletedDoctor: doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerDoctor = async (req, res) => {
  console.log(req.user.role);

  if (req.user.role === "admin") {
    const doctors = req.body; 
    const doctorIds = [];

    // Iterate through the array of doctors and register each one
    for (const doctor of doctors) {
      let password = crypto.randomBytes(6).toString("hex");
      const newDoctor = {
        name: doctor.name,
        lastName: doctor.lName,
        email: doctor.email,
        location: doctor.location,
        role: "doctor",
        password: password,
        hasLogged: false,
      };

      const hashedPassword = await hashPassword(newDoctor.password);
      newDoctor.password = hashedPassword;

      const dynamicTemplateId = "d-9957694fd9754b4a9651e8ec62e56c3d"; 
      const templateData = {
        subject: "Account Creation",
        head: "Welcome to MediSathi.",
        text: "Thank you for Joining Us. Use the given password to login for the first time ",
        data: password,
      };

      sendEmail(newDoctor.email, dynamicTemplateId, templateData);

      const findSame = await User.findOne({email: newDoctor?.email})

console.log(findSame)

      // Register the doctor
      if(findSame){
        doctorIds.push(findSame._id);
      }
      else{
        const user = await User.create(newDoctor);
        doctorIds.push(user._id);
      }
    }

    // Return the array of registered doctor IDs
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Doctors Registered", doctorIds });
  }
  throw new UnauthorizedError("Unauthorized!!");
};
