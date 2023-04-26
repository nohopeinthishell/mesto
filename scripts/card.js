import { createPopupImage } from "./index.js";

class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._src = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeneres();
    this._element.querySelector('.places__image').src = this._src;
    this._element.querySelector('.places__image').alt = this._alt;
    this._element.querySelector('.places__text').textContent = this._name;

    return this._element
  }

  _deleteCard = () => {
    this._element.remove();
  }

  _likeCard = () => {
    this._element.querySelector('.places__like-button').classList.toggle('places__like-button_active');
  }

  _openPopupCard = () => {
    createPopupImage(this._data)
  }

  _setEventListeneres() {
    this._element.querySelector('.places__delete-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.places__like-button').addEventListener('click', this._likeCard);
    this._element.querySelector('.places__image').addEventListener('click', this._openPopupCard);
  }
}


export {Card};