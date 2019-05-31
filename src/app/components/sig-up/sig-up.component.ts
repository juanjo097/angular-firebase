import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-sig-up',
  templateUrl: './sig-up.component.html',
  styleUrls: ['./sig-up.component.scss']
})
export class SigUpComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
