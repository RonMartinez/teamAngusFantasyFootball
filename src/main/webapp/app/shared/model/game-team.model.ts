import { IGame } from 'app/shared/model/game.model';
import { ITeam } from 'app/shared/model/team.model';

export interface IGameTeam {
  id?: number;
  score?: number;
  game?: IGame;
  team?: ITeam;
}

export class GameTeam implements IGameTeam {
  constructor(public id?: number, public score?: number, public game?: IGame, public team?: ITeam) {}
}
