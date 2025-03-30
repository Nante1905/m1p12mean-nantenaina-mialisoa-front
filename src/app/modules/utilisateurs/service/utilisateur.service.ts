import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { RoleType } from '../../../shared/types/Auth';
import { Utilisateur } from '../../../shared/types/Utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  findAllMecanoAndManager() {
    return this.http.get<ApiResponse<Utilisateur[]>>(
      `/utilisateurs?roles=${RoleType.MANAGER}&roles=${RoleType.MECANICIEN}`
    );
  }
}
