async function loadComplaints() {
  try {
    const status = statusFilter.value;
    const category = categoryFilter.value;

    const queryParams = new URLSearchParams();

    if (status && status !== "all") {
      queryParams.append("status", status);
    }

    if (category && category !== "all") {
      queryParams.append("category", category);
    }

    const res = await fetch(`/admin/complaints?${queryParams.toString()}`);
    const complaints = await res.json();

    const tableBody = document.querySelector("#complaintTable tbody");
    tableBody.innerHTML = "";

    let resolvedCount = 0;
    let pendingCount = 0;
    let declinedCount = 0;

    complaints.forEach((comp) => {
      const row = document.createElement("tr");

  
      row.innerHTML = `
        <td>${comp._id}</td>
        <td>${comp.email}</td>
        <td>${comp.otherDesc}</td>
        <td>${new Date(comp.createdAt).toLocaleString()}</td>
        <td>${comp.status}</td>
        <td>${comp.category}</td>
      `;

      row.addEventListener("click", () => {
        window.location.href = `/cmp/status?complaint_id=${comp._id}`;
      });

      row.style.cursor = "pointer"; 

      tableBody.appendChild(row);

    
      if (comp.status === "Resolved") resolvedCount++;
      else if (comp.status === "Pending") pendingCount++;
      else if (comp.status === "Declined") declinedCount++;
    });

    summary.textContent = `Resolved: ${resolvedCount} | Pending: ${pendingCount} | Declined: ${declinedCount}`;

  } catch (error) {
    console.error("Error fetching complaints:", error);
  }
}
statusFilter.addEventListener("change", loadComplaints);
categoryFilter.addEventListener("change", loadComplaints);

window.onload = loadComplaints;