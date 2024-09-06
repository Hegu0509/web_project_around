export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`#${popupSelector}`);
    this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.remove("popup_opened");
  }

  setEventListeners() {
    const popupCloseButton =
      this._popupElement.querySelector(".popup__close-icon");

    popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
