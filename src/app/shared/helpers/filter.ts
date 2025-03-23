import { HttpParams } from '@angular/common/http';

export const filterToHttpParams = (filter: object = {}): HttpParams => {
  let params = new HttpParams();

  Object.keys(filter).forEach((key) => {
    const value = (filter as any)[key];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value.toString());
    }
  });

  return params;
};
