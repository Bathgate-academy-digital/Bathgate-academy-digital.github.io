async function submitUser() {
  const name = document.getElementById('name').value;
  const schoolClass = document.getElementById('class').value;
  const response = await createUser(name, schoolClass);
  localStorage.setItem('id', response.id);
  window.location.assign('../game/')
}
