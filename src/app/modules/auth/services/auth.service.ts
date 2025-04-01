import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { RoleType } from '../../../shared/types/Auth';
import { Utilisateur } from '../../../shared/types/Utilisateur';
import { LoginFormDto } from '../types/LoginFormDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser!: Utilisateur | null;
  private token = localStorage.getItem('access');
  jwtHelper: JwtHelperService;
  private router!: Router;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
    this.currentUser = this.getInitUser();
  }

  login(data: LoginFormDto) {
    return this.http.post<ApiResponse<{ token: string }>>('/auth/login', data);
  }

  loginBO(data: LoginFormDto) {
    return this.http.post<ApiResponse<{ token: string }>>(
      '/auth/bo/login',
      data
    );
  }

  getInitUser = () => {
    if (this.token && this.jwtHelper.isTokenExpired(this.token) === false) {
      return this.jwtHelper.decodeToken(this.token);
    } else {
      return null;
    }
  };
  getCurrentUser = () => {
    return this.currentUser;
  };
  hasRole = (required: RoleType[]) => {
    if (!this.currentUser) return false;
    return required.some((role) => role === this.currentUser?.role);
  };
  hasAllRole = (required: RoleType[]) => {
    if (!this.currentUser) return false;
    return required.every((role) => role === this.currentUser?.role);
  };
  logOut = () => {
    localStorage.removeItem('access');
    return this.currentUser;
  };
  decodeToken = (token: string): Utilisateur | null => {
    return this.jwtHelper.decodeToken(token);
  };
  setToken = (token: string) => {
    localStorage.setItem('access', token);
  };
  setCurrentUser = (user: Utilisateur) => {
    this.currentUser = user;
  };
}
