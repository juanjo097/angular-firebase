import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptoService } from '../../shared/crypto.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {

  signInForm : FormGroup;

  constructor(public authServ : AuthService,
              public fb : FormBuilder,
              public crypto: CryptoService) { }

  ngOnInit() {
    this.authForm();
    this.crypto.supportsCrypto();
  }

  authForm()
  {
    this.signInForm = this.fb.group({
      user : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }

  invalidForm():boolean
  {
    return !this.signInForm.valid ? true : false;
  }

  submitFormSignIn()
  {
    if(this.signInForm.invalid)
    {
      this.invalidForm();
    }
    else
    {
      let user = this.signInForm.value['user'];
      let pass = this.signInForm.value['password'];
      this.authServ.SignIn(user,pass);
    }

  }

}
