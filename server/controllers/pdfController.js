// generateReportController.js
import {StatusCodes} from 'http-status-codes';
import fs from 'fs';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import ConvertAPI from 'convertapi';
import fetch from 'node-fetch';
import { sendEmail } from './emailController.js';
import Booking from '../modals/bookingModal.js';


const convertapi = new ConvertAPI('VmTS6MamP4kWDQls');

export const generateReport = async (req, res) => {
  try {
    // Assuming the data is sent as JSON in the request body
    const data = req.body;
    const newBooking = await Booking.findByIdAndUpdate(data._id,{applicationStatus:'completed'})
    

    await newBooking.save();

    // Use the data to fill in the Word template
    const templatePath = './templates/finalTemplate2.docx';
    const templateData = fs.readFileSync(templatePath);

    const zip = new PizZip(templateData);
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    const docData = {
      _id: data._id,
      hospitalName: data.hospitalName,
      hospitalType: data.hospitalType,
      hospitalLocation: data.hospitalLocation,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      doctorName: data.doctorName,
      doctorEmail: data.doctorEmail,
      appointmentDate: data.appointmentDate,
      symptoms: data.symptoms,
      diagnosis: data.diagnosis,
      appointmentNumber: data.appointmentNumber,
      treatmentPlan: data.treatmentPlan,
      medicines: data.medicines,
      details: data.details,
      signatureDate: data.signatureDate,
      doctorSignatureDate: data.doctorSignatureDate,
    };
    
    // You can use docData in your doc.setData() statement
    doc.setData(docData);
    

    // Render the document with the data
    doc.render();
    const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Save the filled-in Word document
    fs.writeFileSync('./filled_medical_report.docx', outputBuffer);

    const pdfFilePath = './server/templates/result.pdf';
    convertapi.convert('pdf', { File: './filled_medical_report.docx' })
    .then(async (result) => {
      const pdfUrl = result.response.Files[0].Url;

      // Download the PDF content from the URL using node-fetch
      return fetch(pdfUrl);
    })
    .then(async (pdfResponse) => {
      if (!pdfResponse.ok) {
        throw new Error('Failed to download the PDF');
      }

      // Read the response body as a buffer
      return pdfResponse.buffer();
    })
    .then(async (pdfBuffer) => {
      // Generate a unique name for the PDF file (e.g., using a timestamp)
      const uniqueName = `report_${Date.now()}.pdf`;

      // Update the Booking document with the PDF data
      newBooking.report = {
        data: pdfBuffer,
        contentType: 'application/pdf', // Adjust the content type as needed
        uniqueName, // Store the unique name for reference
      };

      // Save the Booking document with the PDF data
      await newBooking.save();

      // Send the email with the PDF attachment
      const dynamicTemplateId = 'd-9957694fd9754b4a9651e8ec62e56c3d'; // Replace with your template ID
      const emailTemplateData = {
        subject: 'Appointment Report',
        head: 'Thank you for Using Us',
        text: 'Please Find the attached appointment report from this email.',
        data: 'Your Medical Report is Attached Here',
      };

      // Send the email with the PDF attachment
      await sendEmail(docData.patientEmail, dynamicTemplateId, emailTemplateData, pdfFilePath);

      // Respond to the client
      res.status(StatusCodes.OK).json({ msg: "Successfully Generated Report", newBooking, docData });
    })
    .catch((error) => {
      console.error('Error converting Word document to PDF:', error);
      res.status(500).json({ error: 'Error converting Word document to PDF' });
    });
} catch (error) {
  console.error('Error generating report:', error);
  res.status(500).json({ error: 'Error generating report' });
}
};export const getPDFByBookingId = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the Booking document by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      // Handle the case where the booking is not found
      console.error('Booking not found for ID:', bookingId);
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    // Check if the booking has a report with data
    if (!booking.report || !booking.report.data) {
      // Handle the case where the PDF data is missing
      console.error('PDF data not found for booking:', bookingId);
      res.status(404).json({ error: 'PDF not found for this booking' });
      return;
    }

    // Set the Content-Type header based on the booking's report.contentType
    res.setHeader('Content-Type', booking.report.contentType);

    // Send the PDF data as the response
    res.send(booking.report.data);
  } catch (error) {
    console.error('Error fetching PDF data:', error);
    res.status(500).json({ error: 'Error fetching PDF data' });
  }
}
