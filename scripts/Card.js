export default class Card {
  constructor(card, selector) {
    this.name = card.name;
    this.link = card.link;
    this.description = card.description;
    this.selector = selector;
  }

  _escEventHandler(evt) {
    if (evt.key === "Escape") {
      this._closePopups();
    }
  }

  _closePopups() {
    popupEdit.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    popupImage.classList.remove("popup_opened");
    document.removeEventListener("keydown", _escEventHandler);
  }

  _addEventListenersToCard() {
    const deleteButton = this._element.querySelector(
      `.${this.selector}-icon-trash`
    );

    const likeButton = this._element.querySelector(
      `.${this.selector}-icon-like`
    );
    const image = this._element.querySelector(`.${this.selector}-image`);

    deleteButton.addEventListener("click", (evt) => {
      if (evt) {
        evt.target.closest(`.${this.selector}`).remove();
      }
    });

    likeButton.addEventListener("click", (evt) => {
      if (evt) {
        evt.target.classList.toggle(`${this.selector}-icon-like_active`);
      }
    });

    image.addEventListener("click", function (evt) {
      if (evt) {
        popupImage.classList.toggle("popup_opened");
        popupImage.querySelector(".popup__image").src = evt.target.src;
        popupImage.querySelector(".popup__image-name").textContent =
          evt.target.alt;
        document.addEventListener("keydown", this._escEventHandler);
      }
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(`.${this.selector}-image`).src = this.link;
    this._element.querySelector(`.${this.selector}-image`).alt =
      this.description;
    this._element.querySelector(`.${this.selector}-text`).textContent =
      this.name;

    this._addEventListenersToCard();

    return this._element;
  }

  _getTemplate() {
    const templateCard = document.querySelector("#templateCard").content;
    const cardElement = templateCard
      .querySelector(`.${this.selector}`)
      .cloneNode(true);

    return cardElement;
  }
}
