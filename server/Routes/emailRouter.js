// emailRoutes.js
import express from 'express';
import { sendEmail } from '../controllers/emailController'; 
const router = express.Router();


router.post('/send-email', async (req, res) => {
  const { toEmail, subject, text } = req.body;

  try {
    await sendEmail(toEmail, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
