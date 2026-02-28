import { Injectable } from '@angular/core';
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app: FirebaseApp = getApps().length
    ? getApp()
    : initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  readonly user$: Observable<User | null> = new Observable((subscriber) => {
    return onAuthStateChanged(
      this.auth,
      (user) => subscriber.next(user),
      (error) => subscriber.error(error),
      () => subscriber.complete(),
    );
  });

  constructor() {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  googleLogin() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }
}
