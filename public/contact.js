
const issueType = document.getElementById("issueType");
const issueDetails = document.getElementById("issueDetails");

issueType.addEventListener("change", function () {
  if (this.value !== "") {
    issueDetails.style.display = "block";
  } else {
    issueDetails.style.display = "none";
  }
});

function submitIssue() {
  const email = document.getElementById("userEmail").value;
  const desc = document.getElementById("issueDescription").value;
  const issueType = document.getElementById("issueType").value;

  if (email && desc && issueType) {
    fetch("/issue/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issueType: issueType,
        email: email,
        description: desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("userEmail").value = "";
        document.getElementById("issueDescription").value = "";
        document.getElementById("issueType").value = "";
        document.getElementById("issueSubmittedMsg").style.display = "block";
        showFlashMessage("  ✅ Your issue has been submitted to the Admin. You will be contacted shortly.");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
      });
  } else {
    alert("Please fill in your email, issue type, and description.");
  }
}

document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("feedbackEmail").value;
  const feedbackText = document.getElementById("feedbackText").value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;

  if (!rating || !feedbackText) {
    alert("Please provide both rating and your suggestions.");
    return;
  }

  try {
    const response = await fetch("/issue/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, rating, feedbackText }),
    });

    const result = await response.json();

    if (response.ok) {
      const msg = document.getElementById("thanksMessage");
      msg.textContent = "✅ Thank you for your feedback!";
      msg.style.display = "block";
      showFlashMessage("✅ Feedback submitted successfully!");

      // Clear form
      this.reset();
    } else {
      alert("Something went wrong: " + result.message);
    }

  } catch (err) {
    alert("Failed to send feedback. Try again.");
    console.error(err);
  }
});
   

function showFlashMessage(message) {
  const flash = document.getElementById("flashMsg");
  flash.textContent = message;
  flash.classList.remove("hidden");

  setTimeout(() => {
    flash.classList.add("hidden");
  }, 3000); // 3 seconds
}


window.addEventListener("DOMContentLoaded", fetchFeedbacks);

function fetchFeedbacks() {
  fetch("/issue/feedbacks")
    .then(res => res.json())
    .then(data => displayFeedbackCards(data))
    .catch(err => console.error("Error loading feedbacks:", err));
}

function displayFeedbackCards(feedbacks) {
  const container = document.createElement("div");
  container.className = "feedback-card-container";

  feedbacks.forEach(fb => {
    const card = document.createElement("div");
    card.className = "card feedback-card";

    const stars = "★".repeat(fb.rating || 0);
    const starDiv = `<div class="stars">${stars}</div>`;

    card.innerHTML = `
      ${starDiv}
      <p>${fb.feedbackText}</p>
      ${fb.email ? `<small>Email: ${fb.email}</small>` : ""}
    `;
    container.appendChild(card);
  });

  document.querySelector(".container").appendChild(container);
}
