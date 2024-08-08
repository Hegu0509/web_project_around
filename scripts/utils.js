function escEventHandler(evt) {
  if (evt.key === "Escape") {
    closePopups();
  }
}

function closePopups() {
  popupEdit.classList.remove("popup_opened");
  popupAdd.classList.remove("popup_opened");
  popupImage.classList.remove("popup_opened");
  document.removeEventListener("keydown", escEventHandler);
}

export { escEventHandler, closePopups };
