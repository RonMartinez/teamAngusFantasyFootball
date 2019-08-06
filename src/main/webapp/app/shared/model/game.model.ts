import { IWeek } from 'app/shared/model/week.model';
import { IGameTeam } from 'app/shared/model/game-team.model';

export interface IGame {
  id?: number;
  week?: IWeek;
  games?: IGameTeam[];
}

export class Game implements IGame {
  constructor(public id?: number, public week?: IWeek, public games?: IGameTeam[]) {}
}
