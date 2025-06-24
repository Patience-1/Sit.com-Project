const BASE_URL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", function () {
  //Book buttons (for multiple sitters)
  const bookmeButtons = document.querySelectorAll(".bookme");

  bookmeButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const name = this.parentNode.parentNode.querySelector(".box > .content > h3")?.textContent;
      const sitterId =this.dataset.sitterid;
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to book a sitter.");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            sitterId,
            date: new Date().toISOString() // or let user pick a date later
          })
        });

        const data = await res.json();
        if (res.ok) {
          alert(`You have successfully booked ${name}!`);
          this.textContent = "Unavailable";
          this.disabled = true;
          this.style.backgroundColor = "gray";
          this.style.cursor = "not-allowed";
        } else {
          alert(data.message || "Booking failed.");
        }
      } catch (err) {
        console.error("Booking error:", err);
        alert("Something went wrong. Please try again.");
      }
    });
  });
});
