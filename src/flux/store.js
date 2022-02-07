import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
import getStockDescription from "../data/stock";
import postLoginAccount from "../data/auth/login";
import postRegisterAccount from "../data/auth/register";
import logoutAccount from "../data/auth/logout";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  stockDesc: getStockDescription(),
  token: null,
  email: null,
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  async registerAccount(payload) {
    const result = await postRegisterAccount(payload)
    if(result.success){
      _store.token = result.token
      sessionStorage.setItem('token', JSON.stringify(result));
      sessionStorage.setItem('email', payload.user.email);
    }
    this.emit(Constants.CHANGE);
    return result;
  }

  async loginAccount(payload) {
    const result = await postLoginAccount(payload)
    if(result.success){
      _store.token = result.token
      sessionStorage.setItem('token', JSON.stringify(result));
      sessionStorage.setItem('email', payload.user.email);

    }
    this.emit(Constants.CHANGE);
    return result;
  }

  getAccount() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken ? userToken.token : null
  }

  getEmail() {
    const email = sessionStorage.getItem('email');
    console.log(email)
    return email
  }
  
  async logoutAccount() {
    const result = await logoutAccount({token: this.getAccount()})
    if(result.success){
      _store.token = null
      sessionStorage.removeItem('token');
    }
    this.emit(Constants.CHANGE);
    return result;
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  getStockDescription() {
    return _store.stockDesc;
  }
}

export default new Store();
