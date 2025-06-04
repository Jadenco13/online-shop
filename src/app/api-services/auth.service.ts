import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subject, switchMap, tap } from 'rxjs';
import { SignInType } from '../types/sign-in-type';
import { AuthType, UserInfo } from '../types/auth-type';
import { CookieService } from 'ngx-cookie-service';
import { SignUpType } from '../types/sign-up-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSignIn = new BehaviorSubject<boolean>(false)
  public userSignUp = new BehaviorSubject<boolean>(false)
  public userNotification = new BehaviorSubject<boolean>(false)
  public leftCanvasCondition = new BehaviorSubject<boolean>(false)
  public rightCanvasCondition = new BehaviorSubject<boolean>(false)
  private user = new BehaviorSubject<UserInfo | null>(null)
  public _user$ = this.user.asObservable()
  private userIsOnline = new BehaviorSubject<boolean>(false)
  public _isUserOnline$ = this.userIsOnline.asObservable()
  constructor(private http: HttpClient, private cookie: CookieService) {
    if (cookie.get('userToken')) {
      this.userIsOnline.next(true)
    }
    this.userIsOnline.pipe(
      filter((isTrue) => isTrue),
      switchMap(() => this.authFun())
    ).subscribe()
  }
  authFun() {
    return this.http.get<UserInfo>('https://api.everrest.educata.dev/auth').pipe(
      tap((user) => {
        this.user.next(user)
      })
    )
  }
  signInFun(userInfo: SignInType) {
    return this.http.post<AuthType>('https://api.everrest.educata.dev/auth/sign_in', userInfo).pipe(
      tap((data) => {
        this.cookie.set('userToken', data.access_token)
        this.userIsOnline.next(true)
      })
    )
  }
  signUp(userInfo: SignUpType){
    return this.http.post<any>('https://api.everrest.educata.dev/auth/sign_up', userInfo)
  }
  logOut() {
    this.cookie.delete('userToken')
    this.userIsOnline.next(false)
  }
  deleteUser() {
    return this.http.delete('https://api.everrest.educata.dev/auth/delete')
  }
}
