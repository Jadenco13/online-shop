import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SignInType } from '../types/sign-in-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  public userSignIn = new BehaviorSubject<boolean>(false)
  public userSignUp = new BehaviorSubject<boolean>(false)
  authFun() {
    return this.http.get('https://api.everrest.educata.dev/auth')
  }
  signInFun(userInfo: SignInType) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_in', userInfo)
  }
}
