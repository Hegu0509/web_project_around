import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBack) {
    super(popupSelector);
    this._submitCallback = callBack;
  }

  _getInputValues() {
    const inputValues = {};
    const form = this._popupElement.querySelector(".form");
    Array.from(form.querySelectorAll("input")).forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popupElement.querySelector(".form");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    const form = this._popupElement.querySelector(".form");
    form.reset();
  }
}
