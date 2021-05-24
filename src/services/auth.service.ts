import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  url=webService.url+"/login";

  public username: String;
  public password: String;
  public UserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

  }

  getData(){
    return this.http.get(webService.url+"/hey",{responseType:'text' });
  }

  authenticationService(username: String, password: String) {
    return this.http.get(this.url,
      { headers: { authorization: this.createBasicAuthToken(username, password) },responseType:'text' }).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.UserLogged.next(true);
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    let authString = 'Basic ' + btoa(username + ':' + password);
    localStorage.setItem('basicauth', authString);
  }

  logout() {
    localStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    localStorage.removeItem("basicauth");
    this.username = null;
    this.password = null;
    this.UserLogged.next(false);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) {
      this.UserLogged.next(false);
      return false
    }
    this.UserLogged.next(true);
    return true
  }

  getLoggedInUserName() {
    let user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

}
