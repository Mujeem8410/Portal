const category = document.getElementById("category");
const teacherFields = document.getElementById("teacherFields");
const academicFields = document.getElementById("academicFields");
const generalIssueDesc = document.getElementById("generalIssueDesc");
function showFlashMessage(message) {
  const flash = document.getElementById("flashMsg");
  flash.textContent = message;
  flash.classList.remove("hidden");

  setTimeout(() => {
    flash.classList.add("hidden");
  }, 3000); // 3 seconds
}

category.addEventListener("change", function () {
  const value = this.value;

  teacherFields.style.display = value === "Teacher Issues" ? "block" : "none";
  academicFields.style.display = value === "Academic Issues" ? "block" : "none";

  const others = [
    "Discipline Issues",
    "Library Complaints",
    "Infrastructure Issues",
    "Hostel Complaints",
    "General Grievances",
  ];
  generalIssueDesc.style.display = others.includes(value) ? "block" : "none";
});

document
  .getElementById("complaintForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    const category = document.getElementById("category").value;
    const email = document.getElementById("email").value;
    let description = "";

    if (category === "Teacher Issues") {
      description = document.getElementById("teacherIssueDesc").value;
    } else if (category === "Academic Issues") {
      description = document.getElementById("academicDesc").value;
    } else {
      description = document.getElementById("otherDesc").value;
    }

    const complaint = {
      date: formattedDate,
      category,
      email,
      description,
      status: "Pending",
    };

    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    showFlashMessage( "Your complaint has been submitted. A tracking code has been sent to your email.");
    this.reset();
    teacherFields.style.display = "none";
    academicFields.style.display = "none";
    generalIssueDesc.style.display = "none";
  });

document
  .getElementById("complaintForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      complaint: document.getElementById("complaint").value,
    };

    const res = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
  showFlashMessage(result.message);
  });
