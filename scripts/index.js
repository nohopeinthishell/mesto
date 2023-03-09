let popupElement = document.querySelector(".popup");
let popupOpenButtonElement = document.querySelector(".profile__edit-button");
let popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
let popupContainer = popupElement.querySelector(".popup__container")

const openPopup = function() {
  let nameValue = document.querySelector(".profile__name");
  let jobValue = document.querySelector(".profile__job");
  let initialValueName = nameValue.textContent;
  let initialValueJob = jobValue.textContent;
  nameInput.value = initialValueName;
  jobInput.value = initialValueJob;
  popupElement.classList.add("popup__is-opened");
};

const closePopup = function() {
  popupElement.classList.remove("popup__is-opened")
};

const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
  
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupContainer.addEventListener("click", closePopupByClickOnOverlay);


// Находим форму в DOM
let formElement = popupElement.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_type_name");// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input_type_job");// Воспользуйтесь инструментом .querySelector()

function handleFormSubmit (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
                                                
    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let newNameValue = document.querySelector(".profile__name");
    let newJobValue = document.querySelector(".profile__job");
    // Вставьте новые значения с помqueощью textContent
    newNameValue.textContent = nameInputValue;
    newJobValue.textContent = jobInputValue;
    closePopup();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);