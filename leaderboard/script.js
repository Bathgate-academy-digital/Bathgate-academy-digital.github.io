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

async function submitUser() {
  const name = document.getElementById('name').value;
  const schoolClass = document.getElementById('class').value;
  const response = await createUser(name, schoolClass, "https://jungle-rush-kk7piym5qq-nw.a.run.app/api/leaderboard");
  document.getElementById('idOutput').innerHTML = JSON.stringify(response);
}

// Call showLeaderboard function when the page is loaded
window.onload = showLeaderboard;
