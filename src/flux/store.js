import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
import getStockDescription from "../data/stock";
import getStocks from "../data/get-stock";
import deleteStock from "../data/delete-stock";
import updateStock from "../data/update-stock";
import getRecommendation from "../data/get-recommendation";
import postLoginAccount from "../data/auth/login";
import postResetPasssword from "../data/auth/reset";
import postRegisterAccount from "../data/auth/register";
import logoutAccount from "../data/auth/logout";
import {saveFavourite, deleteFavourite} from "../data/favourite";

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
      localStorage.setItem('token', JSON.stringify(result));
      localStorage.setItem('email', payload.user.email);
    }
    this.emit(Constants.CHANGE);
    return result;
  }

  async loginAccount(payload) {
    const result = await postLoginAccount(payload)
    if(result.success){
      _store.token = result.token
      localStorage.setItem('token', JSON.stringify(result));
      localStorage.setItem('email', payload.user.email);

    }
    this.emit(Constants.CHANGE);
    return result;
  }

  async resetPassword(payload) {
    const result = await postResetPasssword(payload)
    this.emit(Constants.CHANGE);
    return result;
  }

  getAccount() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken ? userToken.token : null
  }

  getEmail() {
    const email = localStorage.getItem('email');
    console.log(email)
    return email
  }
  
  async logoutAccount() {
    const result = await logoutAccount({token: this.getAccount()})
    _store.token = null
    localStorage.removeItem('token');
    this.emit(Constants.CHANGE);
    return result;
  }

  async getStocks() {
    const result = await getStocks({token: this.getAccount()})
    this.emit(Constants.CHANGE);
    return result;
  }

  updateStock(payload) {
    return updateStock(payload)
  }

  async getRecommendation() {
    return getRecommendation({token: this.getAccount()})
  }

  deleteStock(id) {
    return deleteStock({token: this.getAccount(), id: id})
  }

  saveFavourite(id) {
    return saveFavourite({token: this.getAccount(), id: id})
  }

  deleteFavourite(id) {
    return deleteFavourite({token: this.getAccount(), id: id})
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
