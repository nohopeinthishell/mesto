import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {title, link}) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__place-image');
    this._popupText = this._popup.querySelector('.popup__image-title');
    this._link = link;
    this._title = title;
  }

  open() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._title;
    this._popupText.textContent = this._title;
    super.open();
  }

}