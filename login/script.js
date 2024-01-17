async function submitUser() {
  const url = 'https://jungle-rush-kk7piym5qq-nw.a.run.app';
  const name = document.getElementById('name').value;
  const schoolClass = document.getElementById('class').value;
  const response = await createUser(name, schoolClass, url);
  localStorage.setItem('id', response.id);
  window.location.assign('../game/')
}
