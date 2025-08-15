document.getElementById("category").addEventListener("change", function() {
    var academicFields = document.getElementById("academicFields");
    if (this.value === "Academic Issues") {
        academicFields.style.display = "block";
    } else {
        academicFields.style.display = "none";
    }
});
document.getElementById("complaintForm").addEventListener("submit", function(event) {
    var email = document.getElementById("email").value;
    var proof = document.getElementById("proof").value;
    if (!email || !proof) {
        event.preventDefault();
        alert("Email ID and proof are required to submit the complaint.");
    }
});
