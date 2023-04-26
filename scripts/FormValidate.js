class FormValidate {
  constructor(data, form) {
    this._formElement = form;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this.buttonToggleState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.buttonToggleState();
      })
    })

  }


  buttonToggleState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }

    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.checkValidity();
    });
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.checkValidity()) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  removeValidationErrors = () => {
    this._inputList.forEach(inputElement => { 
      this._hideInputError(inputElement);
    })
  }

  enabelValidation() {
    this._setEventListeners();
  }

}

export {FormValidate};






