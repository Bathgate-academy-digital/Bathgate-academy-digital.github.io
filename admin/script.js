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
  
  async function submitUser() {
    const name = document.getElementById('name').value;
    const schoolClass = document.getElementById('class').value;
    const response = await createUser(name, schoolClass, "https://jungle-rush-kk7piym5qq-nw.a.run.app/api/leaderboard");
    document.getElementById('idOutput').innerHTML = JSON.stringify(response);
  }

  async function deleteUser(name, schoolClass) {
    const requestBody = `name=${name}&class=${schoolClass}`;
    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const options = {
      method: "POST",
      headers: requestHeaders,
      body: requestBody
    };
  
    const response = await fetch(`http://localhost:8080/api/delete`, options);
    return response.json();
  }
  
  window.onload = showLeaderboard;
  