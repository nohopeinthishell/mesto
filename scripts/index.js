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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const initialCardsReversed = initialCards.reverse();

const openPopupProfile = function() {
  let initialValueName = nameValue.textContent;
  let initialValueJob = jobValue.textContent;
  nameInput.value = initialValueName;
  jobInput.value = initialValueJob;
  popupProfile.classList.add("popup_opened");
};

const closePopup = function(popup) {
  popup.classList.remove("popup_opened");
};

const openPopupCard  = function() {
  titleCardInput.value = '';
  linkCardInput.value = '';
  popupCards.classList.add('popup_opened');
};


function handleFormSubmit (event) {
    event.preventDefault();                                     
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    newNameValue.textContent = nameInputValue;
    newJobValue.textContent = jobInputValue;
    closePopup(popupProfile);
};

function createFormSumbit(event) {
  event.preventDefault();
  let titleInputValue = titleCardInput.value;
  let linkInputValue = linkCardInput.value;
  item = {name: titleInputValue, link: linkInputValue};
  createCard(item);
  closePopup(popupCards);
}


formProfile.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', createFormSumbit);
popupOpenButtonProfile.addEventListener('click', openPopupProfile);
popupCloseButtonProfile.addEventListener('click', () => {closePopup(popupProfile)});
popupCloseButtonCards.addEventListener('click', () => {closePopup(popupCards)});
popupCloseButtonImage.addEventListener('click',() => {closePopup(popupImage)});
popupOpenButtonCards.addEventListener('click', openPopupCard);


const createCard = function(item) {
  const newCard = cardsTemplate.querySelector('.places__card').cloneNode(true);

  newCard.querySelector('.places__image').addEventListener('click', (evt) => createPopupImage(evt.target));

  newCard.querySelector('.places__image').src = item.link;
  newCard.querySelector('.places__text').textContent = item.name;
  newCard.querySelector('.places__image').alt = item.name;
  newCard.querySelector('.places__like-button').addEventListener('click', (evt) => evt.target.classList.toggle('places__like-button_active'));
  newCard.querySelector('.places__delete-button').addEventListener('click', (evt) => evt.target.parentElement.remove('places__card'));
  cardList.prepend(newCard);
}

initialCards.forEach(createCard);



const createPopupImage = function(item) {
  popupImage.querySelector('.popup__place-image').src = item.src;
  popupImage.querySelector('.popup__image-title').textContent = item.alt;
  popupImage.classList.add('popup_opened');
}


