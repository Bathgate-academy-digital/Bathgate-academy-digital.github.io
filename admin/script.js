async function showLeaderboard(selectedClass, password) {
  const items = await getAdminLeaderboard(selectedClass, password);

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
      removeButton.onclick = function() {
        console.log("Remove button clicked for", item.id);
      };
      removeButtonCell.appendChild(removeButton);
    });
  }
}

function updateLeaderboard(password) {
  const selectedClass = classDropdown.value;
  showLeaderboard(selectedClass, password);
}

function login() {
  const password = document.getElementById('password').value;

  updateLeaderboard(password)
  const classDropdown = document.getElementById('classDropdown');
  classDropdown.addEventListener('change', () => updateLeaderboard(password));
  window.setInterval(() => updateLeaderboard(password), 30000);
  hideModal();
}

function hideModal() {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  modal.classList.remove("darkened-modal");
  modal.classList.add("closed");
  modalContent.classList.add("closed")
}

