import Booking from '../modals/bookingModal.js';
import { sendEmail } from './emailController.js';

export const handleAbsentRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const dynamicTemplateId = 'd-9957694fd9754b4a9651e8ec62e56c3d'; 
    const emailTemplateData = {
      subject: 'Appointment Deleted',
      head: `Your Appointment for id: ${id} has been Deleted.`,
      text: 'Deleted due to absent',
      data: 'Your Appointment is deleted because of Absency',
    };

    await sendEmail(req.body.email, dynamicTemplateId, emailTemplateData);

    res.status(200).json({ message: 'Absent Applicant Deleted!!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
