import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopups, escEventHandler } from "./utils.js";

// Popup Edit
const editButton = document.querySelector(".profile__info-edit-button");
const popupEdit = document.querySelector("#popupEdit");
const closeEditButton = popupEdit.querySelector(".popup__close-icon");
const inputName = document.querySelector("#inputName");
const inputAbout = document.querySelector("#inputAbout");
const formEdit = document.querySelector("#formEdit");

// Popup Add
const addButton = document.querySelector(".profile__info-add-button");
const popupAdd = document.querySelector("#popupAdd");
const closeAddButton = popupAdd.querySelector(".popup__close-icon");
const inputTitle = document.querySelector("#inputTitle");
const inputLink = document.querySelector("#inputLink");
const formAdd = document.querySelector("#formAdd");

// Popup Image
const popupImage = document.querySelector("#popupImage");
const closeImageButton = popupImage.querySelector(".popup__close-icon-image");

const nameUser = document.querySelector(".profile__info-name");
const aboutMe = document.querySelector(".profile__info-occupation");

const placeGrid = document.querySelector(".place-grid");

// Array de tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/places/yosemite.jpg",
    description: "Valle de Yosemite",
  },
  {
    name: "Lago Louise",
    link: "./images/places/lake-louise.jpg",
    description: "Lago Louise",
  },
  {
    name: "Montañas Calvas",
    link: "./images/places/bald-mountains.jpg",
    description: "Montañas Calvas",
  },
  {
    name: "Latemar",
    link: "./images/places/latemar.jpg",
    description: "Latemar",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/places/vanoise.jpg",
    description: "Parque Nacional de la Vanoise",
  },
  {
    name: "Lago di Braies",
    link: "./images/places/lago.jpg",
    description: "Lago di Braies",
  },
];

// Configuracion para la validacion de formularios
const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  fieldsetSelector: ".form__fieldset",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formValidator = new FormValidator(configForm, "submit");

function addInitialCards() {
  initialCards.forEach((card) => {
    const newCard = new Card(card, "place-grid__element");
    const cardElement = newCard.createCard();
    placeGrid.append(cardElement);
  });
}

addInitialCards();
formValidator.enableValidation();

editButton.addEventListener("click", function () {
  popupEdit.classList.toggle("popup_opened");
  document.addEventListener("keydown", escEventHandler);
  inputName.value = nameUser.textContent;
  inputAbout.value = aboutMe.textContent;
  formValidator.enableValidation();
});

closeEditButton.addEventListener("click", function () {
  popupEdit.classList.toggle("popup_opened");
});

addButton.addEventListener("click", function () {
  inputLink.value = "";
  inputTitle.value = "";
  popupAdd.classList.toggle("popup_opened");
  document.addEventListener("keydown", escEventHandler);
});

closeAddButton.addEventListener("click", function () {
  popupAdd.classList.toggle("popup_opened");
});

formEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameUser.textContent = inputName.value;
  aboutMe.textContent = inputAbout.value;
  popupEdit.classList.toggle("popup_opened");
  document.addEventListener("keydown", escEventHandler);
});

formAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCardData = {
    name: inputTitle.value,
    link: inputLink.value,
    description: inputTitle.value,
  };

  const newElement = new Card(newCardData, "place-grid__element");
  const newCardElement = newElement.createCard();

  placeGrid.prepend(newCardElement);
  popupAdd.classList.toggle("popup_opened");
});

closeImageButton.addEventListener("click", function () {
  popupImage.classList.toggle("popup_opened");
});

document.querySelectorAll(".popup").forEach((form) => {
  form.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopups();
    }
  });
});
