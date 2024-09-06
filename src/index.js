import "./pages/index.css";
import FormValidator from "./utils/FormValidator.js";
import {
  editButton,
  addButton,
  inputName,
  inputAbout,
  userName,
  aboutMe,
  placeGrid,
} from "./utils/utils.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";

const formAdd = document.querySelector("#formAdd");

// Array de tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    description: "Valle de Yosemite",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    description: "Lago Louise",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    description: "Montañas Calvas",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    description: "Latemar",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    description: "Parque Nacional de la Vanoise",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
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
formValidator.enableValidation();

// Popup Image
const popupImage = new PopupWithImage("popupImage");

// Se agrega cards iniciales
const cards = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = new Card(element, "place-grid__element", {
        handleCardClick: () => {
          popupImage.open(element.name, element.link);
        },
      });
      cards.addItem(newCard.createCard());
    },
  },
  ".place-grid"
);
cards.renderer();

// Obtiene datos de perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-occupation",
});

// Popup Editar
const popupEdit = new PopupWithForm("popupEdit", (inputValues) => {
  userName.textContent = inputValues.inputName;
  aboutMe.textContent = inputValues.inputAbout;
  popupEdit.close();
});

editButton.addEventListener("click", () => {
  popupEdit.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  formValidator.enableValidation();
});

//Popup Agregar
const popupAdd = new PopupWithForm("popupAdd", (inputValues) => {
  const newCardData = {
    name: inputValues.inputTitle,
    link: inputValues.inputLink,
    description: inputValues.inputTitle,
  };
  const newCard = new Card(newCardData, "place-grid__element", {
    handleCardClick: () => {
      popupImage.open(newCardData.name, newCardData.link);
    },
  });
  placeGrid.prepend(newCard.createCard());
});

addButton.addEventListener("click", () => {
  popupAdd.open();
});
