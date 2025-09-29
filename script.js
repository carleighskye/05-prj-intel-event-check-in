// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const checkInForm = document.getElementById("checkInForm");
  const attendeeNameInput = document.getElementById("attendeeName");
  const greeting = document.getElementById("greeting");
  const attendeeCount = document.getElementById("attendeeCount");
  const teamSelect = document.getElementById("teamSelect");
  const waterCount = document.getElementById("waterCount");
  const zeroCount = document.getElementById("zeroCount");
  const powerCount = document.getElementById("powerCount");
  let totalAttendees = 0;
  let teamCounts = {
    water: 0,
    zero: 0,
    power: 0,
  };
  const progressBar = document.getElementById("progressBar");
  const attendanceGoal = 50;

  checkInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = attendeeNameInput.value.trim();
    const team = teamSelect.value;
    if (name.length > 0 && team) {
      greeting.textContent = `Welcome, ${name}! Thank you for checking in.`;
      greeting.style.display = "block";
      totalAttendees = totalAttendees + 1;
      attendeeCount.textContent = totalAttendees;
      teamCounts[team] = teamCounts[team] + 1;
      if (team === "water") {
        waterCount.textContent = teamCounts.water;
      } else if (team === "zero") {
        zeroCount.textContent = teamCounts.zero;
      } else if (team === "power") {
        powerCount.textContent = teamCounts.power;
      }
      // Update progress bar
      let percent = (totalAttendees / attendanceGoal) * 100;
      if (percent > 100) {
        percent = 100;
      }
      progressBar.style.width = `${percent}%`;
      attendeeNameInput.value = "";
      teamSelect.value = "";
    }
  });

  attendeeNameInput.addEventListener("input", function () {
    if (attendeeNameInput.value.trim().length === 0) {
      greeting.textContent = "";
      greeting.style.display = "none";
    }
  });
});
