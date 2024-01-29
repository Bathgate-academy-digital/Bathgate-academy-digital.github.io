async function showLeaderboard(selectedClass) {
  const items = await getLeaderboard(selectedClass);

  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.visibility = 'visible';

  const table = document.getElementById('leaderboardBody');
  table.replaceChildren();

  if (items.length === 0) {
    let noDataRow = table.insertRow();
    let noDataCell = noDataRow.insertCell(0);
    noDataCell.colSpan = 4; // Update colspan to include the Remove button cell
    noDataCell.innerHTML = '<h3>No Data Found!</h3>';
  } else {
    (await items).forEach(item => {
      let row = table.insertRow();
      let name = row.insertCell(0);
      name.innerHTML = item.name;
      let schoolClass = row.insertCell(1);
      schoolClass.innerHTML = item.class;
      let score = row.insertCell(2);
      score.innerHTML = item.time;

      let removeButtonCell = row.insertCell(3);
      let removeButton = document.createElement("button");
      removeButton.innerHTML = "Remove";
      removeButton.className = "remove-button"; // Apply the remove button style
      removeButton.onclick = function () {
        console.log("Remove button clicked for", item.id);
      };
      removeButtonCell.appendChild(removeButton);
    });
  }
}

const classDropdown = document.getElementById('classDropdown');
classDropdown.addEventListener('change', function() {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass);
});

window.onload = function() {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass);
};

window.setInterval(function() {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass);
});