import { makeAutoObservable } from "mobx";

class AuthStore {
  isLogin = false;
  userInfo = {
    title:"",
    username: "",
    email: "",
    password:""
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUserInfo(value) {
    this.userInfo = value;
    this.isLogin = true;
  }

  setLogout(){
    this.isLogin = false;
    console.log("here")
  }
}

export default AuthStore;
