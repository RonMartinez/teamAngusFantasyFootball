import { IRules } from 'app/shared/model/rules.model';
import { IWeek } from 'app/shared/model/week.model';
import { ISeasonTeam } from 'app/shared/model/season-team.model';

export interface ISeason {
  id?: number;
  year?: number;
  rules?: IRules;
  weeks?: IWeek[];
  seasonTeams?: ISeasonTeam[];
}

export class Season implements ISeason {
  constructor(
    public id?: number,
    public year?: number,
    public rules?: IRules,
    public weeks?: IWeek[],
    public seasonTeams?: ISeasonTeam[]
  ) {}
}
