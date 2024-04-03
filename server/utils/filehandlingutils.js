import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import pdf from "html-pdf";
import {sendEmail} from "../controllers/emailController.js"

export const fillPDFTemplate = (data) => {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const templatePath = resolve(currentDir, "../templates/pdfTemplate.html");
    const templateContent = fs.readFileSync(templatePath, "utf8");
    const compiledTemplate = handlebars.compile(templateContent);
  
    const filledHTML = compiledTemplate(data);
  
    return filledHTML;
  };
  
  export const sendEmailWithPDF = async (email, pdfData) => {
    try {
      const dynamicTemplateId = "d-9957694fd9754b4a9651e8ec62e56c3d";
      const templateData = {
        subject: "Medical Report",
        head: "Welcome to MediSathi.",
        text: "Thank you for using our service, Your report is attached with this email",
      };
      await sendEmail(email, dynamicTemplateId, templateData, pdfData);
    } catch (error) {
      console.error("Error sending email with PDF:", error);
      throw new Error("Error sending email with PDF");
    }
  };

  export const convertHTMLToBase64 = async (filledHTML) => {
    try {
      const options = {
        format: "A4",
        type: "pdf",
        base: "data:image/png;base64,",
      };
      const pdfBuffer = await new Promise((resolve, reject) => {
        pdf.create(filledHTML, options).toBuffer((err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        });
      });
      const base64Data = pdfBuffer.toString("base64");
  
      return base64Data;
    } catch (error) {
      console.error("Error converting HTML to base64:", error);
      throw new Error("Error converting HTML to base64");
    }
  };