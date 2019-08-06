import { ISeason } from 'app/shared/model/season.model';
import { ITeam } from 'app/shared/model/team.model';

export interface ISeasonTeam {
  id?: number;
  year?: number;
  season?: ISeason;
  team?: ITeam;
}

export class SeasonTeam implements ISeasonTeam {
  constructor(public id?: number, public year?: number, public season?: ISeason, public team?: ITeam) {}
}
