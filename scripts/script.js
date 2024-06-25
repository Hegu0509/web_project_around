const editButton = document.querySelector(".profile__info-edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");
const nameUser = document.querySelector(".profile__info-name");
const aboutMe = document.querySelector(".profile__info-occupation");
const inputName = document.querySelector("#inputName");
const inputAbout = document.querySelector("#inputAbout");
const form = document.querySelector(".popup__form");

editButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
  inputName.value = nameUser.textContent;
  inputAbout.value = aboutMe.textContent;
});

closeButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  nameUser.textContent = inputName.value;
  aboutMe.textContent = inputAbout.value;
  popup.classList.toggle("popup_opened");
});
