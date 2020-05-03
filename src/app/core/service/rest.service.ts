import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private API_URL = environment.backend_url;

  constructor(private http: HttpClient,
              private userService: UserService) {}

  get = (url: string, params?: any) =>
    this.http.get(this.API_URL + url, { params: params, headers: this.prepareAuthorizationHeaders() });

  post = (endpoint: string, data: any, params?: any) =>
     this.http.post(this.API_URL + endpoint, data, { params: params, headers: this.prepareAuthorizationHeaders() });

  put = (endpoint: string, data: any, params?: any) =>
     this.http.put(this.API_URL + endpoint, data, { params: params, headers: this.prepareAuthorizationHeaders() });

  delete = (endpoint: string, params?: any) =>
     this.http.delete(this.API_URL + endpoint, { params: params, headers: this.prepareAuthorizationHeaders() });

  prepareAuthorizationHeaders = () =>
    this.userService.loggedIn ?
      new HttpHeaders({ 'auth': JSON.stringify(this.userService.user) }) :
      {};
}
