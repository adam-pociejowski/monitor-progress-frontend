import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '' +
    '<app-navbar></app-navbar>' +
    '<div style="margin-top: 70px">' +
    '<router-outlet></router-outlet></div>'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
