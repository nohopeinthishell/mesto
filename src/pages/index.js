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

const formWithImagePopup = new PopupWithImage('.popup_image');
formWithImagePopup.setEventListeners();

const userProfile = new UserInfo({nameSelector: ".profile__name", jobSelector: ".profile__job"});


const initialCardSet = new Section({items: initialCardsReversed, 
  renderer:  (item) => 
  {return createCard(item)}}, '.places__cards');
initialCardSet.renderItems();

const formProfileValidated = new FormValidate(enableValidationSet, formProfile);
formProfileValidated.enabelValidation();

const formCardValidated = new FormValidate(enableValidationSet, formCard);
formCardValidated.enabelValidation();

const OpenPopupProfile = () => {
  const {name, job} = userProfile.getUserInfo();
  popupWithProfileForm.setInputValues({name,job})
  popupWithProfileForm.open();
  formProfileValidated.toggleButtonState();
  formProfileValidated.removeValidationErrors();
}

const openPopupCard = () => {
  popupWithCardForm.open();
  formCardValidated.toggleButtonState();
  formCardValidated.removeValidationErrors();
}

const popupWithCardForm = new PopupWithForm('.popup_cards', (data) => {initialCardSet.addItem(createCard(data))});
popupWithCardForm.setEventListeners();
popupOpenButtonCards.addEventListener('click', openPopupCard);

const popupWithProfileForm = new PopupWithForm('.popup_profile', (data) => {userProfile.setUserInfo(data)});
popupWithProfileForm.setEventListeners();
popupOpenButtonProfile.addEventListener('click', OpenPopupProfile)



function createCard(item) {
  const card = new Card(item, '.template', () => {
    formWithImagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement
}







