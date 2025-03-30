import { Marque } from '../types/Marque';
import { Motorisation } from '../types/Motorisation';
import { Vehicule } from '../types/Vehicule';

export const getMarqueName = (vehicule: Vehicule): string => {
  return typeof vehicule.marque === 'string'
    ? (vehicule.marque as string)
    : (vehicule.marque as Marque)?.nom;
};

export const getMotorisationName = (vehicule: Vehicule): string => {
  return typeof vehicule.motorisation === 'string'
    ? (vehicule.motorisation as string)
    : (vehicule.motorisation as Motorisation)?.nom;
};
