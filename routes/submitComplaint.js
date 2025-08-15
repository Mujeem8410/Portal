const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const Complaint = require("../models/complaint");
require("dotenv").config();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST complaint
router.post("/", upload.single("proof"), async (req, res) => {
  try {
    const {
      category,
      teacherName,
      teacherCourse,
      teacherSemester,
      teacherIssueDesc,
      academicCourse,
      academicSemester,
      academicDesc,
      otherDesc,
      email,
    } = req.body;
    console.log(category)
    const complaintData = {
      category,
      email,
      proofFileName: req.file?.filename || "",
    };

    if (category === "Teacher Issues") {
      complaintData.teacherName = teacherName;
      complaintData.course = teacherCourse;
      complaintData.semester = teacherSemester;
      complaintData.otherDesc = teacherIssueDesc;
    } else if (category === "Academic Issues") {
      complaintData.course = academicCourse;
      complaintData.semester = academicSemester;
      complaintData.otherDesc = academicDesc;
    } else {
      complaintData.otherDesc = otherDesc;
    }

    const complaint = new Complaint(complaintData);
    await complaint.save();

    // Email confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Complaint is Registered - Samadhan Portal",
      html:  `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
    <h2 style="color: #2563eb;">Complaint Submitted</h2>
    
    <p>Hi,</p>
    
    <p>We have received your complaint under the category: <strong style="color: #dc2626;">${category}</strong>.</p>

    <div style="margin: 20px 0; padding: 15px; background-color: #eff6ff; border-left: 4px solid #2563eb;">
      <p><strong>Complaint ID:</strong> ${complaint._id}</p>
    </div>

    <p>Our team will review your concern and get back to you shortly. Please keep your Complaint ID safe for future reference.</p>

    <p>Thank you for using <strong>Samadhan Portal</strong>! We are committed to resolving your issue.</p>

    <br/>
    <p>Regards,  
    <br/><strong>Samadhan Portal Team</strong></p>

    <hr style="margin: 30px 0;" />

    <p style="font-size: 0.85em; color: gray; text-align: center;">
      This is an automated message. Please do not reply to this email.
    </p>
  </div>
`,
    };
    console.log(complaint._id);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email send error:", error);
      } else {
        console.log("Confirmation email sent:", info.response);
      }
    });

    res.status(200).send("Complaint submitted and email sent successfully!");
  } catch (err) {
    console.error("Complaint submission error:", err);
    res.status(500).send("Server error while submitting complaint");
  }
});

module.exports = router;
