export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
    
  }

  getUserInfo() {
    return {name: this._nameInput.textContent, job: this._jobInput.textContent};
  }


  setUserInfo({name, about}) {
    this._name = name;
    this._job = about;
    this._nameInput.textContent = this._name;
    this._jobInput.textContent = this._job;

  }
}