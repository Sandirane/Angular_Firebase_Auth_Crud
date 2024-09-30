import { Injectable } from "@angular/core";
import { Auth, authState, getAuth, signOut, User } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',  
  })

export class AuthStateService {

    constructor(private auth: Auth) { }

    get authState$(): Observable<User | null> {
        return authState(this.auth);
    }

    get currentUser() {
        return getAuth().currentUser;
    }

    logOut() {
        return signOut(this.auth);
    }

}