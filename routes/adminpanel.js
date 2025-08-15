const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
router.get("/complaints", async (req, res) => {
  try {
    const { status, category } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (category && category !== "all") filter.category = category;

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
