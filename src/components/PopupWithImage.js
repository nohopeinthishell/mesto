import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__place-image');
    this._popupText = this._popup.querySelector('.popup__image-title');
  }

  open({title, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupText.textContent = title;
    super.open();
  }

}