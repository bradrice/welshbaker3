import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
// import { Observable, of } from 'rxjs';
import { NgAuthService } from '../../share/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  // user$: Observable<firebase.User> = this.authService.User;
  // errMsg$ = this.authService.errorMessage;
  errMsg: string;

  constructor(
    // private db: AngularFirestore,
    // private route: ActivatedRoute,
    // private router: Router,
    private fb: FormBuilder,
    public authService: NgAuthService,
    // private _router: Router,

  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email2: ['', [Validators.email, Validators.required]],
      password2: ''
    });

    // this.errMsg$.subscribe(data => {
    //   this.errMsg = data;
    // })
  }

  get email2(): string {
    return this.loginForm.get('email2')?.value;
  }

  get password2(): string {
    return this.loginForm.get('password2')?.value;
  }

  // getErrorMessage() {
  //   console.log('oopsie daisey');
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  

  login() {
    // this.afAuth.auth.signInAnonymously();
    console.log("logging in: ", this.email2, this.password2);
    let success = this.authService.SignIn(this.email2, this.password2);
    console.log(success, this.authService.errorMessage);
    if(!success){
      console.log("Unfortunatly, no success");
    }
  }

}
