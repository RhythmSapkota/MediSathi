import {StatusCodes} from 'http-status-codes';
import User from '../modals/userModal.js';
import Hospital from '../modals/hospitalModal.js';
import { UnauthorizedError } from '../errors/customErrors.js';

export const getCurrentUser = async(req,res) => {
   const user = await User.findOne({_id:req.user.userId})
   const userWithoutPassword = user.toJSON()
;   res.status(StatusCodes.OK).json({user: userWithoutPassword})
}
export const getApplicationStats = async(req,res) => {
    const users = await User.countDocuments();
    const hospitals = await Hospital.countDocuments();
    res.status(StatusCodes.OK).json({users,hospitals})
}
export const updateUser = async (req,res) => {
   const obj = {...req.body};
   delete obj.password;
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)
    res.status(StatusCodes.OK).json({msg:"update user"})
}

export const getAllUsers = async (req,res) => {
    console.log(req.user.role)
    if (req.user.role === "admin") {
        const users = await User.find();
        res.status(StatusCodes.OK).json({msg:"Users Loaded",users})
    }
     throw new UnauthorizedError("Unauthorized!!")
}