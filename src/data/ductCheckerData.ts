export const CAL_METHOD = 'velocity';
export const UNITS = 'siUnits';

export const SI_UNITS = {
  volume: 'm3/s',
  velocity: 'm/s',
  length: 'm',
  frictionRate: 'Pa/m',
  height: 'mm',
  area: 'sqmt',
  weigth: 'kg',
};

export const BRITISH_UNITS = {
  volume: 'cfm',
  velocity: 'fpm',
  length: 'In',
  frictionRate: 'Pa/m',
  height: 'mm',
  area: 'sqmt',
  weigth: 'kg',
};

export function getUnitsRate(method: string, unit: string) {
  if (method === 'velocity' && unit === 'siUnits') {
    return 'Pa/m';
  } else if (method === 'velocity' && unit === 'britishUnits') {
    return 'In/100ft';
  } else if (method === 'frictionRate' && unit === 'siUnits') {
    return 'm/s';
  } else if (method === 'frictionRate' && unit === 'britishUnits') {
    return 'fpm';
  }
}
