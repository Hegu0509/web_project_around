const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configForm
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configForm.errorClass);
};

const hideInputError = (formElement, inputElement, configForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configForm.inputErrorClass);
  errorElement.classList.remove(configForm.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configForm
    );
  } else {
    hideInputError(formElement, inputElement, configForm);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, configForm) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configForm.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(configForm.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, configForm) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configForm.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configForm.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, configForm);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, configForm);
    });
  });
};

const enableValidation = (configForm) => {
  const formList = Array.from(
    document.querySelectorAll(configForm.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    //setEventListeners(formElement, configForm);

    const fieldsetList = Array.from(
      formElement.querySelectorAll(configForm.fieldsetSelector)
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, configForm);
    });
  });
};

const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  fieldsetSelector: ".form__fieldset",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(configForm);
