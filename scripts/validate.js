const enableValidationSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

const enabelValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, rest);
  })
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  buttonToggleState(inputList, buttonElement, rest);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, rest);
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      buttonToggleState(inputList, buttonElement, rest);
    })
  })
}

const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.checkValidity()) {
    showInputError(formElement, inputElement, rest);
  }
  else {
    hideInputError(formElement, inputElement, rest);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.checkValidity();
  });
}

const buttonToggleState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
    
  }
}

const showInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass);
}

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}



const removeValidationErrors = (formElement, popupInputs) => {
  popupInputs.forEach(inputElement => { 
    hideInputError(formElement, inputElement, enableValidationSet);
  })
}

enabelValidation(enableValidationSet);