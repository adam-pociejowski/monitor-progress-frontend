import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private API_URL = environment.backend_url;

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, params?: any) {
    return this.http.get<T>(this.API_URL + url, {params: params});
  }

  post(endpoint: string, data: any, params?: any) {
    return this.http.post(this.API_URL + endpoint, data, {params: params});
  }

  put(endpoint: string, data: any, params?: any) {
    return this.http.put(this.API_URL + endpoint, data, {params: params});
  }

  delete(endpoint: string, params?: any) {
    return this.http.delete(this.API_URL + endpoint, {params: params});
  }
}
