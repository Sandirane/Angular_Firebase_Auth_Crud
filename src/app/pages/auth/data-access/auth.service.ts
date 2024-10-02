import { Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  user as firebaseUser
} from '@angular/fire/auth';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = firebaseUser(this.auth);
  currentUserSig = signal<User | null | undefined>(undefined);

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

  signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    return signInWithPopup(this.auth, provider)
  }

}
