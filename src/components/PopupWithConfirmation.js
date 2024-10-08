import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(handleDeleteSubmit) {
    super.open();
    this.handleDeleteSubmit = handleDeleteSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupElement.querySelector(".form");
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleDeleteSubmit();
      this.close();
    });
  }
}
