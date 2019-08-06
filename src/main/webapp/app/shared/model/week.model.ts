import { ISeason } from 'app/shared/model/season.model';
import { ITeamOwner } from 'app/shared/model/team-owner.model';
import { IGame } from 'app/shared/model/game.model';

export interface IWeek {
  id?: number;
  playoffs?: boolean;
  championship?: boolean;
  season?: ISeason;
  teamOwners?: ITeamOwner[];
  weeks?: IGame[];
}

export class Week implements IWeek {
  constructor(
    public id?: number,
    public playoffs?: boolean,
    public championship?: boolean,
    public season?: ISeason,
    public teamOwners?: ITeamOwner[],
    public weeks?: IGame[]
  ) {
    this.playoffs = this.playoffs || false;
    this.championship = this.championship || false;
  }
}
