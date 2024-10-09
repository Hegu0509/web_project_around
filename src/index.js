import "./pages/index.css";
import FormValidator from "./utils/FormValidator.js";
import {
  editButton,
  addButton,
  inputName,
  inputAbout,
  placeGrid,
  editAvatarButton,
  avatarImage,
} from "./utils/utils.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import api from "./components/Api.js";

const formAdd = document.querySelector("#formAdd");

const avatarNode = document.querySelector(".profile__avatar");
let currentUser = null;
let cards = null;

// Obtiene datos de perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-occupation",
});

api.getUserInfo().then((user) => {
  currentUser = user;
  userInfo.setUserInfo({ name: user.name, about: user.about });
  avatarNode.src = user.avatar;

  api.getInitialCards().then((cards) => {
    // Se agrega cards iniciales
    cards = new Section(
      {
        items: cards,
        renderer: (element) => {
          const newCard = new Card(
            element,
            "place-grid__element",
            currentUser,
            {
              handleCardClick: () => {
                popupImage.open(element.name, element.link);
              },
              handleDeleteCard: (cardId, callBack) => {
                deleteForm.open(() => {
                  api.deleteCard(cardId).then(() => {});
                  callBack();
                });
              },
              handleAddLike: (cardId) => {
                return api.addLike(cardId);
              },
              handleRemoveLike: (cardId) => {
                return api.removeLike(cardId);
              },
            }
          );
          cards.addItem(newCard.createCard());
        },
      },
      ".place-grid"
    );
    cards.renderer();
  });
});

// Popup Image
const popupImage = new PopupWithImage("popupImage");

// Popup Editar
const popupEdit = new PopupWithForm("popupEdit", (inputValues) => {
  api.updateUser(inputValues.inputName, inputValues.inputAbout).then((user) => {
    userInfo.setUserInfo({ name: user.name, about: user.about });
    popupEdit.close();
  });
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
  return api
    .addCard(inputValues.inputTitle, inputValues.inputLink)
    .then((card) => {
      const newCard = new Card(card, "place-grid__element", currentUser, {
        handleCardClick: () => {
          popupImage.open(card.name, card.link);
        },
        handleDeleteCard: (cardId, callBack) => {
          deleteForm.open(() => {
            api.deleteCard(cardId).then(() => {});
            callBack();
          });
        },
        handleAddLike: (cardId) => {
          return api.addLike(cardId);
        },
        handleRemoveLike: (cardId) => {
          return api.removeLike(cardId);
        },
      });
      placeGrid.prepend(newCard.createCard());
    });
});

addButton.addEventListener("click", () => {
  popupAdd.open();
});

//Popup confirmar eliminar
const deleteForm = new PopupWithConfirmation("popupConfirmation");

//Popup Editar foto de perfil
const popupEditAvatar = new PopupWithForm("popupEditAvatar", (inputValues) => {
  return api.updateAvatar(inputValues.inputLink).then((res) => {
    avatarImage.src = res.avatar;
    avatarImage.alt = "Profile Avatar";
    avatarImage.value = "";
    popupEditAvatar.close();
  });
});

editAvatarButton.addEventListener("click", () => {
  popupEditAvatar.open();
});

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
