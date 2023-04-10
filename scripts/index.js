const popupProfile = document.querySelector(".popup_profile");
const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
const popupCloseButtonProfile = popupProfile.querySelector(".popup__close-button");
const nameValue = document.querySelector(".profile__name");
const jobValue = document.querySelector(".profile__job");
const formProfile = popupProfile.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleCardInput = document.querySelector(".popup__input_type_title");
const linkCardInput = document.querySelector(".popup__input_type_link");
const newNameValue = document.querySelector(".profile__name");
const newJobValue = document.querySelector(".profile__job");
const popupCards = document.querySelector('.popup_cards');
const popupOpenButtonCards = document.querySelector('.profile__add-button');
const popupCloseButtonCards = popupCards.querySelector('.popup__close-button');
const cardsTemplate = document.querySelector('.template').content;
const cardList = document.querySelector('.places__cards');
const formCard = popupCards.querySelector('.popup__form_card');
const popupImage = document.querySelector('.popup_image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button');
const popupPlaceImage = popupImage.querySelector('.popup__place-image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const popupCardInputs = Array.from(formCard.querySelectorAll('.popup__input'));
const popupProfileInputs = Array.from(formProfile.querySelectorAll('.popup__input'));
const popupProfileButton = formProfile.querySelector('.popup__submit');

const initialCardsReversed = initialCards.reverse();

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}

const closePopupByClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

const closePopupByClickOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const openPopupProfile = function() {
  const initialValueName = nameValue.textContent;
  const initialValueJob = jobValue.textContent;
  nameInput.value = initialValueName;
  jobInput.value = initialValueJob;
  buttonToggleState(popupProfileInputs, popupProfileButton, enableValidationSet);
  removeValidationErrors(formProfile, popupProfileInputs);
  openPopup(popupProfile);
};

const closePopup = function(popup) {
  popup.classList.remove("popup_opened");
};

const openPopupCard  = function() {
  titleCardInput.value = '';
  linkCardInput.value = '';
  removeValidationErrors(formCard, popupCardInputs);
  openPopup(popupCards);
};


function handleFormSubmit (event) {
    event.preventDefault();                                     
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    newNameValue.textContent = nameInputValue;
    newJobValue.textContent = jobInputValue;
    closePopup(popupProfile);
};

function createFormSumbit(event) {
  event.preventDefault();
  const titleInputValue = titleCardInput.value;
  const linkInputValue = linkCardInput.value;
  item = {name: titleInputValue, link: linkInputValue};
  renderCard(createCard(item));
  closePopup(popupCards);
}




formProfile.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', createFormSumbit);
popupOpenButtonProfile.addEventListener('click', openPopupProfile);
popupOpenButtonCards.addEventListener('click', openPopupCard);

document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup)); 
}); 



const createCard = function(item) {
  const newCard = cardsTemplate.querySelector('.places__card').cloneNode(true);
  const cardImage = newCard.querySelector('.places__image');
  cardImage.addEventListener('click', () => createPopupImage(item));

  cardImage.src = item.link;
  newCard.querySelector('.places__text').textContent = item.name;
  cardImage.alt = item.name;
  newCard.querySelector('.places__like-button').addEventListener('click', (evt) => evt.target.classList.toggle('places__like-button_active'));
  newCard.querySelector('.places__delete-button').addEventListener('click', (evt) => evt.target.closest('.places__card').remove('places__card'));
  return newCard;
}
;

const renderCard = (createCard) => {
  cardList.prepend((createCard));
}

initialCards.forEach(card => renderCard(createCard(card)));


const createPopupImage = function(item) {
  popupPlaceImage.src = item.link;
  popupPlaceImage.alt = item.name;
  popupImageTitle.textContent = item.name;
  openPopup(popupImage);
}

popupCards.addEventListener('mousedown', closePopupByClickOnOverlay);
popupImage.addEventListener('mousedown', closePopupByClickOnOverlay);
popupProfile.addEventListener('mousedown', closePopupByClickOnOverlay);
document.addEventListener('keydown', closePopupByClickOnEsc);





