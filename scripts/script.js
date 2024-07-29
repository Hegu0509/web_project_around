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
const templateCard = document.querySelector("#templateCard").content;

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

function addEventListenersToCard(cardElement) {
  const deleteButton = cardElement.querySelector(
    ".place-grid__element-icon-trash"
  );
  const likeButton = cardElement.querySelector(
    ".place-grid__element-icon-like"
  );
  const image = cardElement.querySelector(".place-grid__element-image");

  deleteButton.addEventListener("click", function (evt) {
    if (evt) {
      evt.target.closest(".place-grid__element").remove();
    }
  });

  likeButton.addEventListener("click", function (evt) {
    if (evt) {
      evt.target.classList.toggle("place-grid__element-icon-like_active");
    }
  });

  image.addEventListener("click", function (evt) {
    if (evt) {
      popupImage.classList.toggle("popup_opened");
      popupImage.querySelector(".popup__image").src = evt.target.src;
      popupImage.querySelector(".popup__image-name").textContent =
        evt.target.alt;
      document.addEventListener("keydown", escEventHandler);
    }
  });
}

function createCard(card) {
  const cardElement = templateCard
    .querySelector(".place-grid__element")
    .cloneNode(true);
  cardElement.querySelector(".place-grid__element-image").src = card.link;
  cardElement.querySelector(".place-grid__element-image").alt =
    card.description;
  cardElement.querySelector(".place-grid__element-text").textContent =
    card.name;

  addEventListenersToCard(cardElement);

  return cardElement;
}

function addInitialCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);

    placeGrid.append(cardElement);
  });
}

addInitialCards();

editButton.addEventListener("click", function () {
  popupEdit.classList.toggle("popup_opened");
  document.addEventListener("keydown", escEventHandler);
  inputName.value = nameUser.textContent;
  inputAbout.value = aboutMe.textContent;
  enableValidation(configForm);
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

  const newCardElement = createCard(newCardData);

  placeGrid.prepend(newCardElement);
  popupAdd.classList.toggle("popup_opened");
});

closeImageButton.addEventListener("click", function () {
  popupImage.classList.toggle("popup_opened");
});

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

document.querySelectorAll(".popup").forEach((form) => {
  form.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopups();
    }
  });
});
