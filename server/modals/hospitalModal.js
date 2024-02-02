import mongoose from 'mongoose';
import {APPLICATION_STATUS, HOSPITAL_LOCATION, HOSPITAL_TYPE} from '../../utils/constants.js'

const HospitalSchema = new mongoose.Schema({
    hospital: String,
    doctors: [{
        name: String,
        lName:String,
        email:String,
        speciality: String,
        schedule: Object,
        applicationStatus: {
            type: String,
            enum: Object.values(APPLICATION_STATUS),
            default: APPLICATION_STATUS.NA,
        },
        bookedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    }],
    hospitalType: {
        type: String,
        enum: Object.values(HOSPITAL_TYPE),
        default: HOSPITAL_TYPE.HOSPITAL,
    },
    hospitalLocation: {
        type: String,
        enum: Object.values(HOSPITAL_LOCATION),
        default: HOSPITAL_LOCATION.LALITPUR
    },
    ratings: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            default: 0
        }
    }],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });


HospitalSchema.methods.calculateAverageRating = function () {
    const ratings = this.ratings;
    if (ratings.length === 0) {
      return 0; // No ratings yet
    }
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / ratings.length;
  };
  

export default mongoose.model('Hospital',HospitalSchema);