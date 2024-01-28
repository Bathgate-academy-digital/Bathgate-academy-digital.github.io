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
