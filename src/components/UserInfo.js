export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameInput.textContent,
      job: this._jobInput.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name = name;
    this._job = about;
    this._nameInput.textContent = this._name;
    this._jobInput.textContent = this._job;
    this._avatar.src = avatar;
  }

  updateAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
