import { ISeason } from 'app/shared/model/season.model';

export interface IRules {
  id?: number;
  description?: string;
  seasons?: ISeason[];
}

export class Rules implements IRules {
  constructor(public id?: number, public description?: string, public seasons?: ISeason[]) {}
}
