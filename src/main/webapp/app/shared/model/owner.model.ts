import { ITeamOwner } from 'app/shared/model/team-owner.model';

export interface IOwner {
  id?: number;
  name?: string;
  teamOwners?: ITeamOwner[];
}

export class Owner implements IOwner {
  constructor(public id?: number, public name?: string, public teamOwners?: ITeamOwner[]) {}
}
