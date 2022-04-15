/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
class LocalStorageData {
  constructor(key) {
    this.key = key;
  }

  setAuth(username, token) {
    const data = JSON.stringify({
      username, token,
    });
    localStorage.setItem(this.key, data);
  }

  getAuth() {
    const data = localStorage.getItem(this.key);
    return JSON.parse(data);
  }

  getToken() {
    const { token } = JSON.parse(localStorage.getItem(this.key));
    return token;
  }

  hasAuth() {
    const data = localStorage.getItem(this.key);
    return !!data;
  }

  removeAuth() {
    localStorage.removeItem(this.key);
  }
}

export default new LocalStorageData('user');
