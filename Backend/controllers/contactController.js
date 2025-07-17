// controllers/contactController.js
const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your email
        pass: process.env.MAIL_PASS, // your app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: "9256.ramesh@gmail.com", // your receiving email
      subject: "New Contact Message",
      html: `
        <h3>Contact Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message." });
  }
};

module.exports = { sendContactEmail };
