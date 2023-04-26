import {Card} from "./card.js";
import { FormValidate } from "./FormValidate.js";
import { initialCards, enableValidationSet } from "./data.js";



const popupProfile = document.querySelector(".popup_profile");
const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
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
const cardList = document.querySelector('.places__cards');
const formCard = popupCards.querySelector('.popup__form_card');
const popupImage = document.querySelector('.popup_image');
const popupPlaceImage = popupImage.querySelector('.popup__place-image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const initialCardsReversed = initialCards.reverse();

const formProfileValidated = new FormValidate(enableValidationSet, formProfile);
formProfileValidated.enabelValidation();

const formCardValidated = new FormValidate(enableValidationSet, formCard);
formCardValidated.enabelValidation();


const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEsc);
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
  formProfileValidated.removeValidationErrors();
  formProfileValidated.buttonToggleState();
  openPopup(popupProfile);
};

const closePopup = function(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByClickOnEsc);
};

const openPopupCard  = function() {
  titleCardInput.value = '';
  linkCardInput.value = '';
  formCardValidated.removeValidationErrors();
  formCardValidated.buttonToggleState();
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
  const item = {name: titleInputValue, link: linkInputValue};
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();
  renderCard(cardElement);
  closePopup(popupCards);
}




formProfile.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', createFormSumbit);
popupOpenButtonProfile.addEventListener('click', openPopupProfile);
popupOpenButtonCards.addEventListener('click', openPopupCard);

document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup));
  buttonsPopup.addEventListener('mousedown', closePopupByClickOnOverlay); 
}); 


const renderCard = (createCard) => {
  cardList.prepend((createCard));
}

const createPopupImage = function(item) {
  popupPlaceImage.src = item.link;
  popupPlaceImage.alt = item.name;
  popupImageTitle.textContent = item.name;
  openPopup(popupImage);
}


initialCardsReversed.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();
  renderCard(cardElement);
})


export {createPopupImage};









