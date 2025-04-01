import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { RoleType } from '../../../shared/types/Auth';
import { Paginated } from '../../../shared/types/Paginated';
import {
  TacheWithStringStatus,
  Utilisateur,
} from '../../../shared/types/Utilisateur';
import { MecanoListFilter } from '../types/mecano';

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

  findAllMecano(filter?: MecanoListFilter) {
    return this.http.get<ApiResponse<Paginated<Utilisateur>>>(
      `/utilisateurs/mecaniciens?nom=${filter?.nom || ''}&page=${
        filter?.page
      }&limit=${filter?.limit}`
    );
  }

  findAllTachesOf(userId: string) {
    return this.http.get<ApiResponse<TacheWithStringStatus[]>>(
      `/utilisateurs/${userId}/taches`
    );
  }
}
