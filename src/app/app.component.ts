import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBVJyWtllUyoB3A5tM6EDknKwTskOQM-iY",
      authDomain: "ng-blog-64e70.firebaseapp.com"
    })
  }

}
