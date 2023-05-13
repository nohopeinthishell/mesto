import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._formInputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  };

  _getInputValues() {
    this._dataInputs = {};
    this._formInputs.forEach(input => {
      this._dataInputs[input.name] = input.value;
    });
    return this._dataInputs;

  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
      this._submitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  _reset() {
    this._popupForm.reset();
  }

  close() {
    super.close();
    setTimeout(() => this._reset(), 500); 
  }

}