import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, of, BehaviorSubject } from 'rxjs';
import firebase from 'firebase';


export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
    user = firebase.auth().currentUser;
    userState: any;
    public errorMessage = new BehaviorSubject('');

    changeErrMsg(data: string) {
    console.log('In changeErrMsg: ', data);
    this.errorMessage.next(data);
    }

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          // JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', "");
          // JSON.parse(localStorage.getItem('user'));
        }
      })
    }
  
    SignIn(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['admin']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          this.changeErrMsg(error.message);
          window.alert(error.message)
        })
    }
  
    SignUp(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
        .then(() => {
          this.router.navigate(['email-verification']);
        })
    }    
  
    ForgotPassword(passwordResetEmail:any) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    get isLoggedIn(): boolean {
      // user = JSON.parse(localStorage.getItem('user') || "");
      // console.log("isLoggedIn: ", user);
      // return (user !== null && user.emailVerified !== false) ? true : false;
      if(this.user){
      return true
    } else {
      return false;
    }
    }
  
    // GoogleAuth() {
    //   return this.AuthLogin(new auth.GoogleAuthProvider());
    // }
  
    AuthLogin(provider:any) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    SetUserData(user:any) {
      this.user = user;
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    }  
}
