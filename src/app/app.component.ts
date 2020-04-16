import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '' +
    '<app-navbar></app-navbar>' +
    '<div class="container" style="margin-top: 70px"><router-outlet></router-outlet></div>'
})
export class AppComponent {}
