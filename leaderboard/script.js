async function showLeaderboard(selectedClass) {
  const items = await getLeaderboard(selectedClass);

  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.visibility = 'visible';

  const table = document.getElementById('leaderboardBody');
  table.replaceChildren();

  if (items.length === 0) {
    // If no data is found, display a message
    let noDataRow = table.insertRow();
    let noDataCell = noDataRow.insertCell(0);
    noDataCell.colSpan = 3; // Span across all columns
    noDataCell.innerHTML = '<h3>No Data Found!</h3>';
  } else {
    // If data is found, populate the leaderboard
    items.forEach(item => {
      let row = table.insertRow();
      let name = row.insertCell(0);
      name.innerHTML = item.name;
      let schoolClass = row.insertCell(1);
      schoolClass.innerHTML = item.class;
      let score = row.insertCell(2);
      score.innerHTML = item.time;
    });
  }
}

// Attach an event listener to the dropdown for the 'change' event
const classDropdown = document.getElementById('classDropdown');
classDropdown.addEventListener('change', function() {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass);
});

// Call showLeaderboard function when the page is loaded with the initial selected value
window.onload = function() {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass);
};

// Refresh leaderboard every 30 seconds
window.setInterval(function() {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass);
}, 30000);
