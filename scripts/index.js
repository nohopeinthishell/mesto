let popupElement = document.querySelector(".popup");
let popupOpenButtonElement = document.querySelector(".profile__edit-button");
let popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
let nameValue = document.querySelector(".profile__name");
let jobValue = document.querySelector(".profile__job");
let formElement = popupElement.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let newNameValue = document.querySelector(".profile__name");
let newJobValue = document.querySelector(".profile__job");

const openPopup = function() {
  let initialValueName = nameValue.textContent;
  let initialValueJob = jobValue.textContent;
  nameInput.value = initialValueName;
  jobInput.value = initialValueJob;
  popupElement.classList.add("popup_opened");
};

const closePopup = function() {
  popupElement.classList.remove("popup_opened")
};

// const closePopupByClickOnOverlay = function(event) {
//   if (event.target === event.currentTarget) {
//     closePopup();
//   }
  
// };




function handleFormSubmit (event) {
    event.preventDefault();                                     
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    newNameValue.textContent = nameInputValue;
    newJobValue.textContent = jobInputValue;
    closePopup();
};


formElement.addEventListener('submit', handleFormSubmit);

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);