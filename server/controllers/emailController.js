// emailController.js
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../utils/sendGrid.js';
import fs from 'fs';
import { getPasswordResetEmailTemplate } from '../templates/resetPasswordTemplate.js';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (toEmail, dynamicTemplateId, templateData, base64Data) => {
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
  if (base64Data) {
    msg.attachments = [
      {
        content: base64Data, 
        filename: 'medical_report.pdf', // Set the desired filename for the attachment
        type: 'application/pdf', // Set the correct content type
        disposition: 'attachment', // Specify as an attachment
      },
    ];
  }

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully', msg.to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


export const sendPasswordResetEmail = async (toEmail, resetLink) => {
  const msg = {
    to: toEmail,
    from: {
      email: 'rhythmsapkota0612@gmail.com',
      name: 'MediSathi',
    },
    subject: 'Password Reset Request',
    html: getPasswordResetEmailTemplate(resetLink), 
  };

  try {
    const result = await sgMail.send(msg);
    console.log('Password reset email sent successfully to', toEmail);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};