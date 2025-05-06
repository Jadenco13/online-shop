import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../api-services/auth.service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private authSerice: AuthService){}
  openSignInForm() {
    this.authSerice.userSignIn.next(true)
  }
  openSignUpForm() {
    this.authSerice.userSignUp.next(true)
  }
}
