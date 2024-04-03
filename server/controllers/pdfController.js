import { StatusCodes } from "http-status-codes";
import Booking from "../modals/bookingModal.js";
import fetch from "node-fetch";
import pkg from "../utils/firebaseConfig.cjs";
import {
  convertHTMLToBase64,
  fillPDFTemplate,
  sendEmailWithPDF,
} from "../utils/filehandlingutils.js";

const { storage, downloadFile } = pkg;
// Function to upload PDF to Firebase Storage
const uploadPDFToFirebase = async (pdfBase64, fileName) => {
  try {
    const bucket = storage.bucket();
    // Upload PDF buffer to Firebase Storage
    await bucket.file(fileName).save(Buffer.from(pdfBase64, "base64"));

    // Get the file URL
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading PDF to Firebase:", error);
    throw new Error("Error uploading PDF to Firebase");
  }
};

export const savePDFDataToDatabase = async (bookingId, pdfData) => {
  try {
    const booking = await Booking.findByIdAndUpdate(bookingId, {
      report: pdfData,
    });
    return booking;
  } catch (error) {
    console.error("Error saving PDF data to database:", error);
    throw new Error("Error saving PDF data to database");
  }
};

// Function to update application status in MongoDB
const updateApplicationStatus = async (bookingId) => {
  try {
    const booking = await Booking.findByIdAndUpdate(bookingId, {
      applicationStatus: "completed",
    });
    return booking;
  } catch (error) {
    console.error("Error updating application status:", error);
    throw new Error("Error updating application status");
  }
};

export const generateReport = async (req, res) => {
  try {
    const data = req.body;

    const templateData = {
      hospitalName: data.hospitalName,
      hospitalType: data.hospitalType,
      hospitalLocation: data.hospitalLocation,
      doctorName: data.doctorName,
      doctorEmail: data.doctorEmail,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      symptoms: data.symptoms || "",
      actualIssue: data.diagnosis || "",
      doctorAdvice: data.treatmentPlan || "",
      details: data.details || "",
      medicines: data.medicines || "",
      appointmentDate:data.appointmentDate || "",
      doctorSignatureDate: data.doctorSignatureDate || "",
    };

    const filledHTML = fillPDFTemplate(templateData);
    console.log(filledHTML);

    const pdfBase64 = await convertHTMLToBase64(filledHTML);

    const fileName = `${data._id}.pdf`;
    const fileUrl = await uploadPDFToFirebase(pdfBase64, fileName);

    await savePDFDataToDatabase(data._id, fileUrl);
    await sendEmailWithPDF(data.patientEmail, pdfBase64);
    await updateApplicationStatus(data._id);

    res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully Generated Report", data });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Error generating report" });
  }
};

export const getPDFByBookingId = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking || !booking.report) {
      console.error(
        "Booking not found or PDF report missing for ID:",
        bookingId
      );
      return res
        .status(404)
        .json({ error: "Booking not found or PDF report missing" });
    }
    const url = await downloadFile(booking.report);
    if (!url) {
      return res.status(404).json({
        error: "The requested file either doesnt exist or cannot be extracted",
      });
    }
    const downloadPdfFromUrl = async (pdfUrl) => {
      try {
        const response = await fetch(pdfUrl);
        const buffer = await response.buffer();
        const base64Data = buffer.toString("base64");
        return base64Data;
      } catch (error) {
        throw new Error("Error downloading PDF: " + error.message);
      }
    };
    const base64Data = await downloadPdfFromUrl(url);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${bookingId}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    return res.status(200).json({
      data: base64Data,
    });
  } catch (error) {
    console.error("Error downloading PDF report:", error);
    return res.status(500).json({ error: "Error downloading PDF report" });
  }
};
