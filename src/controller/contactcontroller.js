// controllers/contactController.js

import transporter from "../config/nodemailer.js";

export const sendContactMessage = async (req, res) => {
  // 1. Destructure all fields you expect from the frontend
  const { name, email, topic, message } = req.body;

  if (!name || !email || !topic || !message) {
    return res
      .status(400)
      .json({ message: "Name, Email, Topic, and Message are required." });
  }

  try {
    // 3. (Optional) Send a "thank you" email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // the user's email
      subject: "Thank you for contacting us!",
      text: `Hello ${name},

Thank you for reaching out about "${topic}". 
We have received your message and will get back to you soon.

Best regards,
[www.seerah.One]
`,
    });

    // 4. Notify the site owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // or "owner@example.com"
      subject: "New Contact Form Submission",
      text: `You have a new contact form submission:

Name: ${name}
Email: ${email}
Topic: ${topic}
Message: ${message}
`,
    });

    console.log("Message received in backend, emails sent.");
    return res.status(200).json({ message: "Message sent successfully." });
    
  } catch (error) {
    console.error("Contact Form Error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to send message.", error: error.message });
  }
};
