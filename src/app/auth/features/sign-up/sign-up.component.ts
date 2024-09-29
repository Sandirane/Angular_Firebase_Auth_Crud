import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/data-access/auth.service';
import { hasEmailError, isRequired } from '@app/auth/utils/validators';

interface FormSignUp {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
      alert("User created")
      this.router.navigateByUrl('/tasks')
    } catch (error) {
      alert("User error not created")
    }
  }

}
