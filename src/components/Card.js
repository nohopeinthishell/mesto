export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    userId,
    deleteFunc,
    toggleLike
  ) {
    this._data = data;
    this._name = data.name;
    this._src = data.link;
    this._likes = data.likes;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._deleteFunc = deleteFunc;
    this._toggleLike = toggleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".places__card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".places__image");
    this._cardText = this._element.querySelector(".places__text");
    this._cardLikeButton = this._element.querySelector(".places__like-button");
    this._likeCount = this._element.querySelector(".places__like-count");

    if (this._userId === this._data.owner._id) {
      this._cardDeleteButton = this._element.querySelector(
        ".places__delete-button"
      );
      this._cardDeleteButton.classList.remove("places__delete-button_hidden");
    }

    this._setEventListeneres();
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._cardText.textContent = this._name;
    this._updateLikesView();

    return this._element;
  }

  deleteCard = () => {
    this._element.remove();
  };

  _updateLikesView = () => {
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("places__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("places__like-button_active");
    }
    this._likeCount.textContent = this._likes.length;
  };

  _setEventListeneres() {
    this._cardLikeButton.addEventListener("click", this._toggleLike);
    this._cardImage.addEventListener("click", this._handleCardClick);
    if (this._userId === this._data.owner._id) {
      this._cardDeleteButton.addEventListener("click", this._deleteFunc);
    }
  }

  isLiked() {
    return this._likes.some((user) => {
      return user._id === this._userId;
    });
  }

  setLikes(data) {
    this._likes = data.likes;
    this._updateLikesView();
  }
}
