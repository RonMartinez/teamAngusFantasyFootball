import { ITeamOwner } from 'app/shared/model/team-owner.model';
import { IGameTeam } from 'app/shared/model/game-team.model';
import { ISeasonTeam } from 'app/shared/model/season-team.model';

export interface ITeam {
  id?: number;
  teamOwners?: ITeamOwner[];
  gameTeams?: IGameTeam[];
  seasonTeams?: ISeasonTeam[];
}

export class Team implements ITeam {
  constructor(public id?: number, public teamOwners?: ITeamOwner[], public gameTeams?: IGameTeam[], public seasonTeams?: ISeasonTeam[]) {}
}
