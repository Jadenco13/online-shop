import { Component } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  constructor(private authService: AuthService) {}
  closeSignUpForm() {
    this.authService.userSignUp.next(false)
  }
}
