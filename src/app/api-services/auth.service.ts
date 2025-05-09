import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SignInType } from '../types/sign-in-type';
import { AuthType, UserInfo } from '../types/auth-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSignIn = new BehaviorSubject<boolean>(false)
  public userSignUp = new BehaviorSubject<boolean>(false)
  public userIsOnline = new BehaviorSubject<boolean>(false)
  public leftCanvasCondition = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient) {}
  authFun() {
    return this.http.get<UserInfo>('https://api.everrest.educata.dev/auth')
  }
  signInFun(userInfo: SignInType) {
    return this.http.post<AuthType>('https://api.everrest.educata.dev/auth/sign_in', userInfo)
  }
}
