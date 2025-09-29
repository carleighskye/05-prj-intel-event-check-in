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
  // Progress bar and goal must be defined before use
  const progressBar = document.getElementById("progressBar");
  const attendanceGoal = 50;
  const attendeeList = document.getElementById("attendeeList");

  // Load saved data from localStorage
  let totalAttendees = 0;
  let teamCounts = {
    water: 0,
    zero: 0,
    power: 0,
  };
  let attendees = [];
  const savedTotal = localStorage.getItem("totalAttendees");
  const savedTeams = localStorage.getItem("teamCounts");
  const savedAttendees = localStorage.getItem("attendees");
  if (savedTotal !== null) {
    totalAttendees = parseInt(savedTotal, 10);
  }
  if (savedTeams !== null) {
    try {
      const parsed = JSON.parse(savedTeams);
      if (typeof parsed === "object") {
        teamCounts = parsed;
      }
    } catch (e) {}
  }
  if (savedAttendees !== null) {
    try {
      const parsed = JSON.parse(savedAttendees);
      if (Array.isArray(parsed)) {
        attendees = parsed;
      }
    } catch (e) {}
  }

  function renderAttendeeList() {
    attendeeList.innerHTML = "";
    attendees.forEach(function (att) {
      const li = document.createElement("li");
      li.textContent = att.name;
      const badge = document.createElement("span");
      badge.className = `team-badge ${att.team}`;
      if (att.team === "water") {
        badge.textContent = "Team Water Wise";
      } else if (att.team === "zero") {
        badge.textContent = "Team Net Zero";
      } else if (att.team === "power") {
        badge.textContent = "Team Renewables";
      }
      li.appendChild(badge);
      attendeeList.appendChild(li);
    });
  }

  // Update UI with saved values
  attendeeCount.textContent = totalAttendees;
  waterCount.textContent = teamCounts.water;
  zeroCount.textContent = teamCounts.zero;
  powerCount.textContent = teamCounts.power;
  let percent = (totalAttendees / attendanceGoal) * 100;
  if (percent > 100) {
    percent = 100;
  }
  progressBar.style.width = `${percent}%`;
  renderAttendeeList();

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
      // Add attendee to list
      attendees.push({ name: name, team: team });
      renderAttendeeList();
      // Update progress bar
      let percent = (totalAttendees / attendanceGoal) * 100;
      if (percent > 100) {
        percent = 100;
      }
      progressBar.style.width = `${percent}%`;
      // Save to localStorage
      localStorage.setItem("totalAttendees", totalAttendees);
      localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
      localStorage.setItem("attendees", JSON.stringify(attendees));

      // Celebration message if goal reached
      if (totalAttendees >= attendanceGoal) {
        // Find winning team
        let max = Math.max(teamCounts.water, teamCounts.zero, teamCounts.power);
        let winners = [];
        if (teamCounts.water === max) {
          winners.push("Team Water Wise");
        }
        if (teamCounts.zero === max) {
          winners.push("Team Net Zero");
        }
        if (teamCounts.power === max) {
          winners.push("Team Renewables");
        }
        let winnerText = winners.join(" & ");
        greeting.textContent = `🎉 Attendance goal reached! Congratulations, ${winnerText}! 🎉`;
        greeting.style.display = "block";
        greeting.style.backgroundColor = "#e8f4fc";
        greeting.style.color = "#003c71";
      }

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
