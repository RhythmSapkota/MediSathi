import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import {
  APPLICATION_STATUS,
  HOSPITAL_TYPE,
  USER_ROLE,
} from "../../utils/constants.js";
import mongoose from "mongoose";
import Hospital from "../modals/hospitalModal.js";
import User from "../modals/userModal.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no Hospital")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(
            "you are not authorized to access this route."
          );
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("name must be between 3 and 50 characters long")
    .trim(),
]);

export const validateHospitalInput = withValidationErrors([
  body("hospital").notEmpty().withMessage("Hospital Name is Required."),
  body("doctors")
    .isArray({ min: 1 })
    .withMessage("Must add at least one doctor"),
  body("doctors.*.name")
    .notEmpty()
    .withMessage("Doctor's Name is Required"),
  body("doctors.*.speciality")
    .notEmpty()
    .withMessage("Doctor's Speciality is Required"),
  body("hospitalLocation")
    .notEmpty()
    .withMessage("Hospital Location is Required."),
  body("hospitalType")
    .isIn(Object.values(HOSPITAL_TYPE))
    .withMessage("Invalid Type Value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const hospital = await Hospital.findById(value);
    if (!hospital) throw new NotFoundError(`no Hospital with id ${value}`);
    const isAdmin = req.user.role === "admin";
const isOwner = req.user.userId === hospital.createdBy.toString();
console.log(isAdmin,isOwner,"sss")    
if (!isAdmin && !isOwner) {
  
      throw new UnauthorizedError(
        `not authorized to access this route.`
      );
    }
  }),
]);

export const validateRegisterUser = withValidationErrors([
  body("name").notEmpty().withMessage("Name is Required"),
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email Alreay Exist.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6, max: 40 })
    .withMessage("Password must be more than characters"),
  body("lastName").notEmpty().withMessage("LastName is Required"),

  body("location").notEmpty().withMessage("Location is Required"),
]);

export const validateLoginUser = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password is Required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is Required"),
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email,{req}) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email Alreay Exist.");
      }
    }),
  body("lastName").notEmpty().withMessage("LastName is Required"),

  body("location").notEmpty().withMessage("Location is Required"),
])