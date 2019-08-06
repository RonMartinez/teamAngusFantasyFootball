import { ITeam } from 'app/shared/model/team.model';
import { IOwner } from 'app/shared/model/owner.model';
import { IWeek } from 'app/shared/model/week.model';

export interface ITeamOwner {
  id?: number;
  name?: string;
  team?: ITeam;
  owner?: IOwner;
  effectiveWeek?: IWeek;
}

export class TeamOwner implements ITeamOwner {
  constructor(public id?: number, public name?: string, public team?: ITeam, public owner?: IOwner, public effectiveWeek?: IWeek) {}
}
