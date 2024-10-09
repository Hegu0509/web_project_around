export default class Card {
  constructor(
    card,
    selector,
    user,
    { handleCardClick, handleDeleteCard, handleAddLike, handleRemoveLike }
  ) {
    this.card = card;
    this._name = card.name;
    this._link = card.link;
    this._description = card.description;
    this._selector = selector;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
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
        // evt.target.closest(`.${this._selector}`).remove();
        this._handleDeleteCard(this.card._id, () => {
          this._element.remove();
        });
      }
    });

    likeButton.addEventListener("click", (evt) => {
      const counter = this._element.querySelector(
        `.${this._selector}-counter-like`
      );
      if (evt) {
        if (this.card.likes.some((like) => like._id === this._user._id)) {
          this._handleRemoveLike(this.card._id).then((card) => {
            this.card = card;
            evt.target.classList.remove(`${this._selector}-icon-like_active`);
            counter.textContent = this.card.likes.length;
          });
        } else {
          this._handleAddLike(this.card._id).then((card) => {
            this.card = card;
            evt.target.classList.add(`${this._selector}-icon-like_active`);
            counter.textContent = this.card.likes.length;
          });
        }
        // evt.target.classList.toggle(`${this._selector}-icon-like_active`);
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

    const trashButton = this._element.querySelector(
      `.${this._selector}-icon-trash`
    );

    const likeButton = this._element.querySelector(
      `.${this._selector}-icon-like`
    );

    if (this._user._id !== this.card.owner._id) {
      trashButton.remove();
    }

    if (this.card.likes.some((like) => like._id === this._user._id)) {
      likeButton.classList.add(`${this._selector}-icon-like_active`);
    }

    const counter = this._element.querySelector(
      `.${this._selector}-counter-like`
    );
    counter.textContent = this.card.likes.length;

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
