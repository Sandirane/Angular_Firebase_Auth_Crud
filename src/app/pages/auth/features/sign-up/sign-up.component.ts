import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';
import { isRequired, hasEmailError } from '../../utils/validators';

interface FormSignUp {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    GoogleButtonComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {

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

  form = this.formBuiler.group<FormSignUp>({
    email: this.formBuiler.control('', [
      Validators.required,
      Validators.email
    ]),
    password: this.formBuiler.control('',
      Validators.required
    ),
  })

  async submitSignUp() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value
      if (!email || !password) return;
      await this.authService.signUp({ email, password })
      this.successMessage.set("User created");
      setTimeout(() => {
        this.router.navigateByUrl('/tasks');
      }, 3000);
    } catch (error) {
      this.errorMessage.set("User error not created");
    }
  }
  async submitWithGoogle() {
    try {
      await this.authService.signInWithGoogle()
      this.successMessage.set("User connected");
      setTimeout(() => {
        this.router.navigateByUrl('/tasks');
      }, 3000);
    } catch (error) {
      this.errorMessage.set("User error not created");
    }
  }
}


