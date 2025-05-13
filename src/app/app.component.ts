import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from './api-services/auth.service';
import { SignInFormComponent } from "./forms/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./forms/sign-up-form/sign-up-form.component";
import { RightCanvasComponent } from "./canvas/right-canvas/right-canvas.component";
import { LeftCanvasComponent } from "./canvas/left-canvas/left-canvas.component";
import { NotificationComponent } from "./toasts/notification/notification.component";

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterModule, FooterComponent, SignInFormComponent, SignUpFormComponent, RightCanvasComponent, LeftCanvasComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-shop';
  public isSignInOpen!: boolean;
  public isSignUpOpen!: boolean;
  public isToastNotificationOpen!: boolean;
  constructor(private authService: AuthService) {
    this.isSignInOpenFun()
    this.isSignUpOpenFun()
    authService.userNotification.subscribe(data => this.isToastNotificationOpen = data)
  }
  isSignInOpenFun() {
    this.authService.userSignIn.subscribe(data => this.isSignInOpen = data)
  }
  isSignUpOpenFun() {
    this.authService.userSignUp.subscribe(data => this.isSignUpOpen = data)
  }
}
