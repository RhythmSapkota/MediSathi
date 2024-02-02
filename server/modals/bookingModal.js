// booking-backend/models/Booking.js
import mongoose from 'mongoose';
import { APPLICATION_STATUS } from '../../utils/constants.js';

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  hospitalId: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  DoctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  schedule: Date,
  issueDescription: String,
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  applicationStatus:{
    type: String,
    enum: Object.values(APPLICATION_STATUS),
    default: APPLICATION_STATUS.PENDING
},
applicantNumber:Number,
report: {
  data: Buffer, 
  contentType: String, 
  uniqueName: String, 
}
});

export default model('Booking', bookingSchema);
