export interface FacturationServiceForm {
  _id: string;
  nom: string;
  prix: number;
  heures: number;
  remise: number;
  total?: number;
}
