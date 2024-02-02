async function submitUser() {
  const name = document.getElementById('name').value.trim();
  const schoolClass = document.getElementById('class').value;
  const response = await createUser(name, schoolClass);
  if (response.id == null) {
    const element = document.getElementById("login-error");
    element.innerHTML = response.error_message
    return;
  }
  localStorage.setItem('id', response.id);
  window.location.replace('../game/')
}

