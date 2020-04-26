import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../../enums/auth.provider.enum';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  signIn(): void {
    this.userService.signIn(AuthProvider.FACEBOOK);
  }
}
