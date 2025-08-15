// const mongoose = require("mongoose");

// //
// const ComplaintSchema = new mongoose.Schema(
//   {
//     studentRefId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 100,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     catagory: {
//       type: String,
//       required: true,
//     },
//     teacherName: {
//       type: String,
//       //required: trusted,
//     },

//     // assignedTo: {
//     //   type: Schema.Types.ObjectId,
//     //   ref: "HOD",
//     //   required: true,
//     // },
//     // escalatedToDean: {
//     //   type: Schema.Types.ObjectId,
//     //   ref: "Dean",
//     // },
//     // escalatedToChief: {
//     //   type: Schema.Types.ObjectId,
//     //   ref: "Chief",
//     // },
//     // type: {
//     //   type: String,
//     //   required: true,
//     // },
//     // evidance: {
//     //   photo: {
//     //     type: [String],
//     //   },
//     // video: {
//     //   type: [String],
//     // },
//     // },
//     // status: {
//     //   type: String,
//     //   enum: [
//     //     "Pending",
//     //     "In Progress",
//     //     "Resolved",
//     //     "Closed",
//     //     "Escalated To Dean",
//     //     "Escalated To Chief",
//     //   ],
//     //   default: "Pending",
//     //   required: true,
//     // },
//     // resolution: {
//     //   type: String,
//     //   trim: true,
//     // },
//     // resolvedBy: {
//     //   type: Schema.Types.ObjectId,
//     // },
//     // resolvedAt: {
//     //   type: Date,
//     // },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//     isBlocked: {
//       type: Boolean,
//       default: false,
//     },
//     isBlockedBy: {
//       type: Schema.Types.ObjectId,
//       ref: "Admin",
//     },
//   },
//   {
//     timestamps: true, // Automatically manage createdAt and updatedAt fields
//   }
// );
// module.exports = mongoose.model("complaint", ComplaintSchema);

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Teacher Issues",
      "Discipline Issues",
      "Library Complaints",
      "Infrastructure Issues",
      "Academic Issues",
      "Hostel Complaints",
      "General Grievances",
    ],
  },

  // Common to Teacher & Academic
  course: String,
  semester: String,

  // Teacher-specific
  teacherName: String,
  teacherIssueDesc: String,

  // Academic-specific
  academicDesc: String,

  // General issues
  otherDesc: String,

  email: {
    type: String,
    required: true,
  },

  proofFileName: String, 

  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
