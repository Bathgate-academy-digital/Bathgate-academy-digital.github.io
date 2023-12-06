async function getLeaderboard(url) {
  const response = await fetch(`${url}`);
  return response.json();
}

async function createUser(name, showClass, url) {
  const requestBody = `name=${name}&class=${showClass}`;
  console.log(requestBody);
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const options = {
    method: "POST",
    headers: requestHeaders,
    body: requestBody
  };

  const response = await fetch(`${url}/api/submit`, options);
  return response.json();
}
