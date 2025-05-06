import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from './api-services/auth.service';
import { SignInFormComponent } from "./forms/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./forms/sign-up-form/sign-up-form.component";

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterModule, FooterComponent, SignInFormComponent, SignUpFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-shop';
  public isSignInOpen!: boolean;
  public isSignUpOpen!: boolean;
  constructor(private authService: AuthService) {
    this.isSignInOpenFun()
    this.isSignUpOpenFun()
  }
  isSignInOpenFun() {
    this.authService.userSignIn.subscribe(data => this.isSignInOpen = data)
  }
  isSignUpOpenFun() {
    this.authService.userSignUp.subscribe(data => this.isSignUpOpen = data)
  }
}
