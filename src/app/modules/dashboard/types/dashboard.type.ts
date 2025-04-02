export interface AppChartDataset {
  label: string;
  data: any[];
  backgroundColor: string;
}

export interface RecettesChartData {
  _id: {
    month: number;
    year: number;
  };
  total: number;
}

export interface RecettesDashboardResponse {
  monthlyRecette: RecettesChartData[];
  recetteOfActualMonth: number;
}

export interface NbrInterventionStat {
  interventions: number;
  interventionsByAppPercent: number;
}

export interface TopServiceDTO {
  count: number;
  nom: string;
}

export interface TopClientDTO {
  count: number;
  nom: string;
  prenom: string;
  email: string;
}
