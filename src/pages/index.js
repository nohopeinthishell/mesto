import "./index.css";

const imageAvatar = new URL("../images/image-avatar.png", import.meta.url);
const logo = new URL("../images/logo-image.svg", import.meta.url);

const images = [
  { name: "imageAvatar", image: imageAvatar },
  { name: "logo", image: logo },
];

import Api from "../components/API.js";
import Card from "../components/card.js";
import FormValidate from "../components/FormValidate.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  formAvatar,
  popupOpenButtonAvatar,
  enableValidationSet,
  popupOpenButtonProfile,
  formProfile,
  popupOpenButtonCards,
  formCard,
  avatarSubmitButton,
  cardSubmitButton,
  profileSubmitButton,
} from "../utils/constant.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

let userId = null;

const deletionPopup = new PopupWithDelete(".popup_delete");
deletionPopup.setEventListeners();

const formWithImagePopup = new PopupWithImage(".popup_image");
formWithImagePopup.setEventListeners();

const userProfile = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const CardSection = new Section((item) => {
  return createCard(item);
}, ".places__cards");

const formAvatarValidated = new FormValidate(enableValidationSet, formAvatar);
formAvatarValidated.enabelValidation();

const formProfileValidated = new FormValidate(enableValidationSet, formProfile);
formProfileValidated.enabelValidation();

const formCardValidated = new FormValidate(enableValidationSet, formCard);
formCardValidated.enabelValidation();

const openPopupAvatar = () => {
  formWithAvatar.open();
  formAvatarValidated.toggleButtonState();
  formAvatarValidated.removeValidationErrors();
};

const openPopupProfile = () => {
  const { name, job } = userProfile.getUserInfo();
  popupWithProfileForm.setInputValues({ name, job });
  popupWithProfileForm.open();
  formProfileValidated.toggleButtonState();
  formProfileValidated.removeValidationErrors();
};

const openPopupCard = () => {
  popupWithCardForm.open();
  formCardValidated.toggleButtonState();
  formCardValidated.removeValidationErrors();
};

const formWithAvatar = new PopupWithForm(".popup_avatar", (data) => {
  updateAvatar(data);
});
formWithAvatar.setEventListeners();
popupOpenButtonAvatar.addEventListener("click", openPopupAvatar);

const popupWithCardForm = new PopupWithForm(".popup_cards", (data) => {
  addNewCard(data);
});
popupWithCardForm.setEventListeners();
popupOpenButtonCards.addEventListener("click", openPopupCard);

const popupWithProfileForm = new PopupWithForm(".popup_profile", (data) => {
  updateProfileInfo(data);
});
popupWithProfileForm.setEventListeners();
popupOpenButtonProfile.addEventListener("click", openPopupProfile);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "32035f3b-2c7c-4514-95d9-d73394472392",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([dataCard, dataProfile]) => {
    userProfile.setUserInfo(dataProfile);
    userId = dataProfile._id;
    CardSection.renderItems(dataCard.reverse());
  })
  .catch((err) => console.log(err));

function createCard(item) {
  const card = new Card(
    item,
    ".template",
    () => {
      formWithImagePopup.open(item);
    },
    userId,
    () => {
      deletionPopup.open();
      deletionPopup.setSubmitAction(() => {
        api
          .deleteItem(item._id)
          .then(() => {
            card.deleteCard();
            deletionPopup.close();
          })
          .catch((err) => console.log(err));
      });
    },
    () => {
      if (card.isLiked()) {
        api
          .deleteLike(item._id)
          .then((res) => {
            card.setLikes(res);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .likeCard(item._id)
          .then((res) => {
            card.setLikes(res);
          })
          .catch((err) => console.log(err));
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const updateAvatar = (data) => {
  avatarSubmitButton.textContent = "Сохранение...";
  avatarSubmitButton.disabled = true;
  api
    .updateAvatar(data)
    .then(() => {
      userProfile.updateAvatar(data);
    })
    .then(() => {
      formWithAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
      avatarSubmitButton.disabled = false;
    });
};

const updateProfileInfo = (data) => {
  profileSubmitButton.textContent = "Сохранение...";
  profileSubmitButton.disabled = true;
  api
    .updateProfile(data)
    .then((res) => {
      userProfile.setUserInfo(res);
    })
    .then(() => {
      popupWithProfileForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
      profileSubmitButton.disabled = false;
    });
};

const addNewCard = (data) => {
  cardSubmitButton.textContent = "Создание...";
  cardSubmitButton.disabled = true;
  api
    .postNewCard(data)
    .then((res) => {
      initialCardSet.addItem(createCard(res));
    })
    .then(() => {
      popupWithCardForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      cardSubmitButton.textContent = "Создать";
      cardSubmitButton.disabled = false;
    });
};
