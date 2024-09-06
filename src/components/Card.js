export default class Card {
  constructor(card, selector, { handleCardClick }) {
    this._name = card.name;
    this._link = card.link;
    this._description = card.description;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _addEventListenersToCard() {
    const deleteButton = this._element.querySelector(
      `.${this._selector}-icon-trash`
    );

    const likeButton = this._element.querySelector(
      `.${this._selector}-icon-like`
    );

    this._element
      .querySelector(`.${this._selector}-image`)
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    deleteButton.addEventListener("click", (evt) => {
      if (evt) {
        evt.target.closest(`.${this._selector}`).remove();
      }
    });

    likeButton.addEventListener("click", (evt) => {
      if (evt) {
        evt.target.classList.toggle(`${this._selector}-icon-like_active`);
      }
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(`.${this._selector}-image`).src = this._link;
    this._element.querySelector(`.${this._selector}-image`).alt =
      this._description;
    this._element.querySelector(`.${this._selector}-text`).textContent =
      this._name;
    this._addEventListenersToCard();

    return this._element;
  }

  _getTemplate() {
    const templateCard = document.querySelector("#templateCard").content;
    const cardElement = templateCard
      .querySelector(`.${this._selector}`)
      .cloneNode(true);

    return cardElement;
  }
}
