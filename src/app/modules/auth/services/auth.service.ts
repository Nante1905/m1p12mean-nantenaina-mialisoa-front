import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { LoginFormDto } from '../types/LoginFormDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginFormDto) {
    return this.http.post<ApiResponse<{ token: string }>>('/auth/login', data);
  }
}
