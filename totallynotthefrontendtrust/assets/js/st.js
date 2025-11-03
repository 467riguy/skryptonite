// startup.js -- hop off, skids
function showCustomAlert(message) {
  const dialog = document.getElementById('custom-alert');
  const messageEl = document.getElementById('alert-message');

  messageEl.textContent = message;
  dialog.showModal();
}
function hideCustomAlert() {
  const dialog = document.getElementById('custom-alert');
  const messageEl = document.getElementById('alert-message');

  dialog.close();
  messageEl.textContent = '';
}
setTimeout(() => {
  showCustomAlert("We tricked the teachers into thinking this site was educational, but it's actually a proxy.");
}, 1000);
