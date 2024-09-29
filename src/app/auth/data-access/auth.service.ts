import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    );
  }

}
