// emailController.js
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../utils/sendGrid.js';
import fs from 'fs';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (toEmail, dynamicTemplateId, templateData, pdfFilePath) => {
  const msg = {
    to: toEmail,
    from: {
      email: 'rhythmsapkota0612@gmail.com',
      name: 'MediSathi',
    },
    templateId: dynamicTemplateId,
    dynamic_template_data: templateData,
  };

  // Check if pdfFilePath is provided, and if so, add the attachment.
  if (pdfFilePath) {
    msg.attachments = [
      {
        content: fs.readFileSync(pdfFilePath).toString('base64'), // Read the PDF file and encode it
        filename: 'medical_report.pdf', // Set the desired filename for the attachment
        type: 'application/pdf', // Set the correct content type
        disposition: 'attachment', // Specify as an attachment
      },
    ];
  }

  try {
    const result = await sgMail.send(msg);
    console.log('Email sent successfully', msg.to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
