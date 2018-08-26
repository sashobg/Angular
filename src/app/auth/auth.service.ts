import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Author } from '../article/models/author';
import { User } from '../core/models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { AuthModel } from '../core/models/auth.model';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<User>;
  users: Observable<User[]>;
  token: string;
  private usersCollection: AngularFirestoreCollection<User>

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase) {

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))

    this.usersCollection = afs.collection<User>('users')
    this.users = this.usersCollection.valueChanges();
  }

  signUp(user: AuthModel) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        this.toastr.success('You can now log in.', 'Success!');
        this.router.navigate(['/auth/signin']);
      })
      .catch((err) => {
        this.toastr.error(err, 'Error!');
      });
  }

  signIn(user: AuthModel) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        this.afAuth.auth
          .currentUser
          .getIdToken()
          .then((token: string) => {
            this.token = token;
          })
       
        sessionStorage.setItem('name', user.email)
        this.updateUserData(data.user)
        this.router.navigate(['/articles/list'])
        this.toastr.success('Hello, ' +  this.getName(), 'Hello!')
      })
      .catch((err) => {
        this.toastr.error(err, 'Error!')
      });
  }

   
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: { reader: true }
    };
    return userRef.set(data, { merge: true });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/auth/signin']);
        this.token = null;
        sessionStorage.clear()
      });
  }

  getToken() {
    if (firebase.auth().currentUser !== null) {
      firebase.auth()
        .currentUser
        .getIdToken()
        .then((token: string) => {
          this.token = token;
        })
      return this.token;
    }
  }



  isAuthenticated(): boolean {
    return this.token != null;
  }

  isAdmin(): boolean {
    if (sessionStorage.getItem('admin') !== null)
      return true
  }

  isAuthorOrAdmin(publisher: string): boolean {
    if (publisher === sessionStorage.getItem('name'))
      return true

    if (sessionStorage.getItem('admin'))
      return true
  }

  isLogged(): boolean {
    if (sessionStorage.getItem('name'))
      return true
  }

  getEmail(): string {
    return firebase.auth()
      .currentUser
      .email

  }

  getName(): string {
    const email = this.getEmail()
    const index = email.indexOf('@')
    return email.substr(0, index)

  }

  getUserId(): string{
    return firebase.auth()
    .currentUser
    .uid
  }

  getUser(): Author {
    return {
      'id': this.getUserId(),
      'email': this.getEmail(),
      'name': this.getName()
    }
  }

}