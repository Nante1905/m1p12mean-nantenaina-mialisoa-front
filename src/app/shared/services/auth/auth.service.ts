import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleType } from '../../types/Auth';
import { Utilisateur } from '../../types/Utilisateur';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser!: Utilisateur | null;
  private token = localStorage.getItem('access');
  jwtHelper: JwtHelperService;

  constructor() {
    console.log('AuthService constructor');
    this.jwtHelper = new JwtHelperService();
    this.currentUser = this.getInitUser();
  }
  getInitUser = () => {
    console.log('init user');

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
}
