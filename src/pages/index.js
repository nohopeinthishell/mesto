import './index.css';

const imageAvatar = new URL('../images/image-avatar.png', import.meta.url);
const logo = new URL('../images/logo-image.svg', import.meta.url)

const images = [
  {name: 'imageAvatar', image: imageAvatar},
  {name: 'logo', image: logo}
]

import Card from "../components/card.js";
import FormValidate from "../components/FormValidate.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, enableValidationSet,  popupOpenButtonProfile, formProfile, nameInput, jobInput, popupOpenButtonCards, formCard} from "../utils/constant.js";
import PopupWithImage from "../components/PopupWithImage.js";

const initialCardsReversed = initialCards.reverse();


const userProfile = new UserInfo({nameSelector: ".profile__name", jobSelector: ".profile__job"});


const InitialCardSet = new Section({items: initialCardsReversed, 
  renderer:  (item) => 
  {const card = new Card(item, '.template', () => {
    const formWithImagePopup = new PopupWithImage('.popup_image', item);
    formWithImagePopup.setEventListeners();
    formWithImagePopup.open();
  });
  const cardElement = card.generateCard();
  return cardElement}}, '.places__cards');
InitialCardSet.renderItems();

const formProfileValidated = new FormValidate(enableValidationSet, formProfile);
formProfileValidated.enabelValidation();

const formCardValidated = new FormValidate(enableValidationSet, formCard);
formCardValidated.enabelValidation();

const OpenPopupProfile = () => {
  const {name, job} = userProfile.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  PopupWithProfileForm.open();
  formProfileValidated.enabelValidation();
}

const OpenPopupCard = () => {
  PopupWithCardForm.open();
  formCardValidated.enabelValidation();
}

const PopupWithCardForm = new PopupWithForm('.popup_cards', (data) => {InitialCardSet.addItem(createCard(data))});
PopupWithCardForm.setEventListeners();
popupOpenButtonCards.addEventListener('click', OpenPopupCard);

const PopupWithProfileForm = new PopupWithForm('.popup_profile', (data) => {userProfile.setUserInfo(data)});
PopupWithProfileForm.setEventListeners();
popupOpenButtonProfile.addEventListener('click', OpenPopupProfile)



function createCard(item) {
  const card = new Card(item, '.template', () => {
    const formWithImagePopup = new PopupWithImage('.popup_image', item);
    formWithImagePopup.setEventListeners();
    formWithImagePopup.open();
  });
  const cardElement = card.generateCard();
  return cardElement
}







