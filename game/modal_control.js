const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalHeader = document.getElementById('modal-text-header');
const modalDescription = document.getElementById('modal-description');
const modalButton = document.getElementById('modal-next-button');

function showComplete() {
  modalHeader.innerHTML = 'Level complete!';
  modalDescription.innerHTML = 'Well done, click the button below for the next level:';
  modalButton.innerHTML = 'Next';
  showModal();
}

function showFailed() {
  modalHeader.innerHTML = 'Level unsuccessful';
  modalDescription.innerHTML = 'Don\'t worry, click the button to retry';
  modalButton.innerHTML = 'Retry';
  showModal();
}

function showModal() {
  modal.classList.remove("closed");
  modal.classList.add("darkened-modal");
  modalContent.classList.remove("closed")
}

function hideComplete() {
  modal.classList.remove("darkened-modal");
  modal.classList.add("closed");
  modalContent.classList.add("closed")
}
