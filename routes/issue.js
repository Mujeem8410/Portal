const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");
const Feedback = require("../models/feedback");

router.post("/submit", async (req, res) => {
  try {
    const { issueType, email, description } = req.body;

    if (!issueType || !email || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newIssue = new Issue({ issueType, email, description });
    await newIssue.save();

    res.status(201).json({ message: "Issue submitted successfully." });
  } catch (err) {
    console.error("Error submitting issue:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/feedback", async (req, res) => {
  const { email, rating, feedbackText } = req.body;

  if (!rating || !feedbackText) {
    return res.status(400).json({ message: "Rating and feedback are required." });
  }

  try {
    const newFeedback = new Feedback({
      email,
      rating,
      feedbackText
    });

    await newFeedback.save();
    res.status(200).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


router.get("/feedbacks", async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // newest first
      res.json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
