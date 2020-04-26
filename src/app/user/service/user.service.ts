import { Injectable } from '@angular/core';
import { AuthProvider } from '../enums/auth.provider.enum';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(`logged as`, user)
    });
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
