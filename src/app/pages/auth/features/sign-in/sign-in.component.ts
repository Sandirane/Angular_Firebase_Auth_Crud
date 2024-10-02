import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';
import { isRequired, hasEmailError } from '../../utils/validators';
import { FormSignIn } from '../../data-access/models/formSignIn';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent {

  constructor(
    private formBuiler: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  isRequired(fiels: 'email' | 'password') {
    return isRequired(fiels, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form)
  }


  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  form = this.formBuiler.group<FormSignIn>({
    email: this.formBuiler.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuiler.control('', Validators.required),
  });

  async submitSignIn() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value
      if (!email || !password) return;
      await this.authService.signIn({ email, password })
      this.successMessage.set("User is connect");
      setTimeout(() => {
        this.router.navigateByUrl('/tasks');
      }, 3000);
    } catch (error) {
      this.errorMessage.set("User is not connect");
    }
  }

  async submitWithGoogle() {

    try {
      await this.authService.signInWithGoogle()
      this.successMessage.set("User is connect");
      setTimeout(() => {
        this.router.navigateByUrl('/tasks');
      }, 3000);
    } catch (error) {
      this.errorMessage.set("User is not connect");
    }

  }

}
