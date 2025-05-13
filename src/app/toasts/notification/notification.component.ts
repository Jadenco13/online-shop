import { Component } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(private authService: AuthService) { }
  openSignUpForm() {
    this.authService.userNotification.next(false)
    this.authService.userSignUp.next(true)
  }
  openSignInForm() {
    this.authService.userNotification.next(false)
    this.authService.userSignIn.next(true)
  }
  cancelNotification() {
    this.authService.userNotification.next(false)
  }
}
