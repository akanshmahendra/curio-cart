import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly baseApiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  login(request: ILoginRequest) {
    const url = `${this.baseApiUrl}/auth/login`;
    return this.http.post<ILoginResponse>(url, request);
  }

  register(request: IRegisterRequest) {
    const url = `${this.baseApiUrl}/users`;
    return this.http.post(url, request);
  }
}
