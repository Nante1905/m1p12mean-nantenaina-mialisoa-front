import { Devis } from '../../../shared/types/Devis';
import { Service } from '../../../shared/types/Service';
import { Vehicule } from '../../../shared/types/Vehicule';

export type RequiredDevisType = Pick<
  Devis,
  | '_id'
  | 'ref'
  | 'date'
  | 'status'
  | 'services'
  | 'total'
  | 'client'
  | 'vehicule'
> & {
  services: Pick<Service, '_id' | 'nom'>[];
} & {
  vehicule: Pick<Vehicule, 'immatriculation' | 'modele'>;
};
