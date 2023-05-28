export default class Api {
  constructor() {

  }

  getProfileInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
  headers: {
    authorization: '32035f3b-2c7c-4514-95d9-d73394472392'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
      headers: {
        authorization: '32035f3b-2c7c-4514-95d9-d73394472392'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
      }

  updateProfile = (data) => {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '32035f3b-2c7c-4514-95d9-d73394472392',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.job
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
   }
    
    postNewCard = (data) => {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
        method: 'POST',
        headers: {
          authorization: '32035f3b-2c7c-4514-95d9-d73394472392',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    deleteItem(cardId) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: '32035f3b-2c7c-4514-95d9-d73394472392',
          'Content-Type': 'application/json'
        },
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
      
    }

    updateAvatar = (data) => {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: '32035f3b-2c7c-4514-95d9-d73394472392',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
   }

  


 

    likeCard = (cardId) => {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: '32035f3b-2c7c-4514-95d9-d73394472392'
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLike = (cardId) => {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: '32035f3b-2c7c-4514-95d9-d73394472392'
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

      getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getProfileInfo()])
      }
      }

