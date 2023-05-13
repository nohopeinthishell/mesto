export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._title = data.title;
    this._src = data.link;
    this._alt = data.title;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.places__image');
    this._cardText = this._element.querySelector('.places__text');
    this._cardLikeButton = this._element.querySelector('.places__like-button');
    this._cardDeleteButton = this._element.querySelector('.places__delete-button');

    this._setEventListeneres();
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._cardText.textContent = this._title ;

    return this._element
  }

  _deleteCard = () => {
    this._element.remove();
  }

  _likeCard = () => {
    this._cardLikeButton.classList.toggle('places__like-button_active');
  }


  _setEventListeneres() {
    this._cardDeleteButton.addEventListener('click', this._deleteCard);
    this._cardLikeButton.addEventListener('click', this._likeCard);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}
