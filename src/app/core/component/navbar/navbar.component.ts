import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService,
              private router: Router) { }

  onSignOut = () =>
    this.userService.signOut()
      .then(() =>
        this.router.navigate(['user/signin']))

  ngOnInit(): void {}
}
