
  window.onload = async function() {
    try {
      const res = await fetch("/auth/role", {
        credentials: "include" // important to send cookies
      });
      
      if (res.ok) {
        const user = await res.json();
        
        if (user.role === "admin") {
          // admin hai => Admin Panel ka link dikhao
          document.getElementById("adminLink").classList.remove("hidden"); // bas ye

        } else {
          // user hai => Admin Panel ka link hata do
          document.getElementById("adminLink").style.display = "none";
        }
      } else {
        // Login nahi hai
        window.location.href = "/login.html"; // ya jo tera login page hai
      }
    } catch (err) {
      console.error("Error checking login:", err);
    }
  }

