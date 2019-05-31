import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {

  constructor(public authServ : AuthService) { }

  ngOnInit() {
  }

}
