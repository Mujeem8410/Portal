const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");


function isAdmin(req) {
  return req.session?.user?.role === "admin";
}




router.get("/status", async (req, res) => {
  const complaintId = req.query.complaint_id;

  try {
    if (!complaintId) {
      return res.status(400).send("<h2 style='color: red;'>Complaint ID is required!</h2>");
    }

    const complaint = await Complaint.findById(complaintId);
    function isTeacher(category) {
     return category ==="Teacher Issues";
    }

    if (!complaint) {
      return res.status(404).send("<h2 style='color: orange;'>Complaint not found!</h2>");
    }


    const admin = isAdmin(req);
    

    res.send(`
      <html>
        <head>
          <title>Complaint Status</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              max-width: 600px;
              margin: auto;
            }
            h2 { color: #007bff; }
            p { line-height: 1.6; }
            select, button {
              padding: 8px;
              margin-top: 10px;
              font-size: 16px;
            }
                          .custom-btn {
              background-color: #181818;
              color: white; 
              border: none
              padding: 10px 20px; 
              font-size: 16px;
              border-radius: 5px; 
              cursor: pointer;
              transition: background-color 0.3s ease; 
            }

            .custom-btn:hover {
              background-color:rgb(35, 144, 58); 
            }
                        select.custom-select {
            background-color: #f8f9fa; 
            border: 1px solid #ced4da; 
            padding: 10px 14px; 
            font-size: 16px;
            border-radius: 5px;
            color: #495057; 
            width: 20%; 
            box-sizing: border-box; 
          }

          select.custom-select:focus {
            border-color:rgb(16, 17, 18); 
            outline: none; 
          }

          </style>
        </head>
        <body>
          <div class="container">
            <h2>Complaint Details</h2>
            <p><strong>ID:</strong> ${complaint._id}</p>
            <p><strong>Category:</strong> ${complaint.category}</p>
            <p><strong>Email:</strong> ${complaint.email}</p>
             ${isTeacher(complaint.category) ? `<p><strong>Teacher Name:</strong> ${complaint.teacherName}</p>
              <p><strong>Course:</strong> ${complaint.course}</p>
              <p><strong>Semester:</strong> ${complaint.semester}</p>
              <p><strong>Issue Desc:</strong> ${complaint.otherDesc}</p>
              <p>`:`<p><strong>OtherDesc:</strong> ${complaint.otherDesc}</p>`} 
            <p><strong>CreateAt:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
            
            ${admin ? `
              <form method="POST" action="/cmp/update-status">
                <input type="hidden" name="complaint_id" value="${complaint._id}" />
                <label for="status">Change Status:</label><br/>
                <select name="status" id="status" class="custom-select">
                  <option value="Pending" ${complaint.status === "Pending" ? "selected" : ""}>Pending</option>
                  <option value="In Progress" ${complaint.status === "In Progress" ? "selected" : ""}>In Progress</option>
                  <option value="Resolved" ${complaint.status === "Resolved" ? "selected" : ""}>Resolved</option>
                  <option value="Rejected" ${complaint.status === "Rejected" ? "selected" : ""}>Rejected</option> <option value="Declined" ${complaint.status === "Declined" ? "selected" : ""}>Declined</option>
                </select><br/>
                <button type="submit" class="custom-btn">Update Status</button>
              </form>
            ` : `
              <p><strong>Status:</strong> ${complaint.status || "Pending"}</p>
            `}

            <br>
            <a href="/status_tracking.html">Check Another Complaint</a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).send("<h2 style='color: red;'>Server error. Please try again later.</h2>");
  }
});

router.post("/update-status", async (req, res) => {
  const { complaint_id, status } = req.body;

  try {
    if (!complaint_id || !status) {
      return res.status(400).send("Complaint ID and status are required!");
    }

    const complaint = await Complaint.findByIdAndUpdate(complaint_id, { status }, { new: true });

    if (!complaint) {
      return res.status(404).send("Complaint not found!");
    }

    res.redirect("/admin.html");
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).send("Server error. Please try again later.");
  }
});

module.exports = router;
