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
  });
}

// Call showLeaderboard function when the page is loaded
window.onload = showLeaderboard;
// Refresh leaderboard every 30 seconds
window.setInterval(showLeaderboard, 30000);
