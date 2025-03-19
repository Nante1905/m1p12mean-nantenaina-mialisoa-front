import { Devis } from '../../../shared/types/Devis';

export interface TakeRdvEventPayload {
  devis: Devis;
  callback: (arg: Devis | null) => void;
}
