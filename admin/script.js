async function showLeaderboard() {
  const items = getLeaderboard();

  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.visibility = 'visible';

  const table = document.getElementById('leaderboardBody');
  table.replaceChildren();

  (await items).forEach(item => {
    let row = table.insertRow();
    let name = row.insertCell(0);
    name.innerHTML = item.name;
    let schoolClass = row.insertCell(1);
    schoolClass.innerHTML = item.class;
    let score = row.insertCell(2);
    score.innerHTML = item.time;

    // Add remove button to delete the entry
    let removeButtonCell = row.insertCell(3);
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = function() {
      deleteUser(item.name, item.class);
    };
    removeButtonCell.appendChild(removeButton);
  });
}

window.onload = showLeaderboard;
