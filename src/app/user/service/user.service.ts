import { Injectable } from '@angular/core';
import { AuthProvider } from '../enums/auth.provider.enum';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService) {
    // if (environment.production) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
    // } else {
    //   this.user = new SocialUser()
    //   this.user.firstName = 'Adam';
    //   this.user.email = 'valverde12345@gmail.com';
    //   this.user.provider = 'FACEBOOK';
    //   this.user.photoUrl = 'https://graph.facebook.com/1951809644963751/picture?type=normal';
    //   this.loggedIn = true;
    // }
  }

  signIn = (provider: AuthProvider) => {
    if (provider === AuthProvider.FACEBOOK) {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    console.error(`No auth provider implementation found for provider: ${provider}`);
  };

  signOut = () => {
    return this.authService.signOut();
  };
}
