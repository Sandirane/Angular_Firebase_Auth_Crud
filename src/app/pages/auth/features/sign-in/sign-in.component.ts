import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';
import { isRequired, hasEmailError } from '../../utils/validators';

interface FormSignIn {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}

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
      alert("User is connect")
      this.router.navigateByUrl('/tasks')
    } catch (error) {
      alert("User is not connect")
    }
  }

  async submitWithGoogle() {

    try {

      await this.authService.signInWithGoogle()
      alert("User connected")
      this.router.navigateByUrl('/tasks')
    } catch (error) {
      alert("User error not created")
    }

  }

}
