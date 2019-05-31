import { Injectable, NgZone } from '@angular/core';
import { User } from './services/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : any; //save user logged in data

  constructor(private afs : AngularFirestore,
  private afAuth: AngularFireAuth,
  private router : Router,
  public ngZone: NgZone)
  {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(
      user =>{
        if(user)
        {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'))
        }
        else
        {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      }
    );
  }

  SignIn(email : string, password: string)
  {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (_res) =>
      {
        this.ngZone.run(
          (_resp)=>
          {
            this.router.navigate(['dashboard']);
          },
          (_err)=>
          {
            console.log(_err);
          }

        );
        this.SetUserData(_res.user);
      },
      (_err) =>
      {
        window.alert('SignIn: Invalid username or password.');
        //console.log('FATAL ERROR: ',_err);
      }
    ).catch(
      (error) =>
      {
        window.alert(error.message);
      }
    );
  }

  // Sign up with email & password
  SignUp(email : string, password: string)
  {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (_res) =>
      {
          this.SendVerificationMail();
          this.SetUserData(_res.user);
      },
      (_err) =>
      {
        console.log('FATAL ERROR: ', _err);
      }
    ).catch(
      (_err) =>
      {
        window.alert(_err);
      }
    );
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail()
  {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(
      (_res) =>
      {
        this.router.navigate(['verify-email-address']);
      }
    );
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail)
  {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(
      (_resp) =>
      {
        window.alert('Password reset, check your mailbox.');
      },
      (_err) =>
      {
        console.log('FATAL ERROR: ', _err);
      }
    ).catch(
      (_err) =>
      {
        window.alert(_err);
      }
    );
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider)
  {
    return this.afAuth.auth.signInWithPopup(provider).then(
      (result) =>
      {
        this.ngZone.run(() =>
        {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch(
        (error) =>
        {
          window.alert(error)
        }
    );
  }

  // Sign in wt¿ith facebook
  FacebookAuth()
  {
    return this.AuthLogin( new auth.FacebookAuthProvider());
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore +
  AngularFirestoreDocument service */
  SetUserData(user)
  {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userData, {
        merge: true
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      window.alert('LOGOUT SUCCESSFUL');
      this.router.navigate(['sign-in']);
    })
  }

  /* Function that returns a bool val when the
  user is logged & verified */
  get isLogged():boolean
  {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;

  }

}
