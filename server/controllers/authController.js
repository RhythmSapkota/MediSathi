import User from "../modals/userModal.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import { sendEmail } from "./emailController.js";
import * as generator  from 'generate-password';
import crypto from 'crypto';
import { sendPasswordResetEmail } from './emailController.js';
import { request } from "http";
import bcrypt from 'bcryptjs'



export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create({...req.body, hasLogged:true});
  res.status(StatusCodes.CREATED).json({ msg: "User Created" });
};



export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
  user && (await comparePassword(req.body.password, user.password));
  
  if (!isValidUser) throw new UnauthenticatedError("invalid Credentials");
  const hasUserLogged = user?.hasLogged;

  user?.updateOne({hasLogged: true});
  
  const token = createJWT({ userId: user._id, role: user.role });


  const token2 = !hasUserLogged? crypto.randomBytes(20).toString('hex'): undefined;
 if (token2){ user.resetPasswordToken = token2;
  user.resetPasswordExpires = Date.now() + 3600000;
  user.hasLogged = true // 1 hour
  await user.save();
}
  const oneDay = 1000 * 60 * 60 * 24;

  console.log(token2)

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user Logged In", hasLogged: hasUserLogged, token:token2  });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", { httpOnly: true, expires: new Date(Date.now()) });
  res.status(StatusCodes.OK).json({msg:'user logged out!'})
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const host = req.headers.origin

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ msg: 'No user found with this email' });
      }
      // console.log(request)
      // Generate a unique token for the reset link
      const token = crypto.randomBytes(20).toString('hex');
      const resetLink = `${host}/reset-password/${token}`;

      // Save the token and expiration time to the user object
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Send the password reset email with the reset link
      await sendPasswordResetEmail(email, resetLink);

      res.json({ msg: 'Password reset email sent successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

export const resetPassword =  async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
      const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
          return res.status(400).json({ msg: 'Invalid or expired token' });
      }

      // Update password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Hash and save new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await user.save();

      res.json({ msg: 'Password reset successful' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
}

export const validateResetLink = async(req,res) =>{
  const {token} = req.params;
  try {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(401).json({ msg: 'UnAuthorized Link or token' });
    }


    res.json({ msg: 'Token is Valid' });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
}