import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthModel } from '../../core/models/auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: AuthModel
  constructor(private authService : AuthService) {
    this.model = new AuthModel('', '')
   }

  ngOnInit() {
  }

  login(form : NgForm) {

    this.authService.signIn(this.model);
  }

}
