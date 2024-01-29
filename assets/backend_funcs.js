const url = 'https://jungle-rush-3hqcrnbkla-nw.a.run.app';

async function getLeaderboard(classFilter) {
  try {
    const response = await fetch(`${url}/api/leaderboard${classFilter ? `?class=${classFilter}` : ''}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    console.error("Response text:", await response.text());
    throw error;
  }
}

async function updateLeaderboard() {
  const classDropdown = document.getElementById('classDropdown');
  const selectedClass = classDropdown.value;
  const leaderboard = await getLeaderboard(selectedClass);
  const leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.visibility = 'visible';
}

async function createUser(name, showClass) {
  const requestBody = `name=${name}&class=${showClass}`;
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const options = {
    method: "POST",
    headers: requestHeaders,
    body: requestBody
  };

  const response = await fetch(`${url}/api/create`, options);
  return response.json();
}

async function updateTime(id, time) {
  const formattedTime = secondsToHHMMSS(time);
  const requestBody = `id=${id}&time=${formattedTime}`;
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const options = {
    method: "POST",
    headers: requestHeaders,
    body: requestBody
  };

  const response = await fetch(`${url}/api/update`, options);
  return response.json();
}

function secondsToHHMMSS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

async function submitUser() {
  const name = document.getElementById('name').value;
  const schoolClass = document.getElementById('class').value.toUpperCase();
  const response = await createUser(name, schoolClass);
  if (response.id == null) {
    const element = document.getElementById("login-error");
    element.innerHTML = response.error_message
    return;
  }
  localStorage.setItem('id', response.id);
  window.location.assign('../game/')
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

  const response = await fetch(`${url}/api/delete`, options);
  return response.json();
}
