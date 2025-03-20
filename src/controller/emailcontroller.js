import transporter from "../config/nodemailer.js";
import path from "path";

export const sendEmail = async (req, res) => {
  const { email, phone } = req.body;

  console.log("Received Email:", email);
  console.log("Received Phone:", phone);

  if (!email || !phone) {
    return res
      .status(400)
      .json({ message: "Email and Phone number are required" });
  }
  const pdfPath = path.join(
    process.cwd(),
    "public",
    "Muhammadpbuh01oct2024-1-1.pdf"
  );

  console.log("PDF Path:", pdfPath);    
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "SEERAH:Discover the extraordinary life of Prophet Muhammad (ﷺ) and his transformative impact on society.",
      text: `Thank you for downloading Muhammad(ﷺ): Love, Humility, and Compassion.

This book is designed to engage today’s youth with its concise format. Short lessons and multiple-choice questions. That aims to reinforce key learnings and retain the knowledge they gain.

We hope this book serves as a meaningful introduction to the life and times of our beloved Prophet (ﷺ). We encourage you to deepen your understanding by exploring more detailed works of renowned scholars.

May this journey inspire you to truly love Rasoolallah sallallahu alaihi wasallam.
Aameen

your phone number given is ${phone}`,
      attachments: [
        {
          filename: "Seerah-Book.pdf",
          path: pdfPath,
        },
      ],
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: "Book Downloaded Notification",
      // Use backticks for multiline / interpolated text
      text: `The following user just downloaded the book:
Email: ${email}
Phone: ${phone}`,
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};

