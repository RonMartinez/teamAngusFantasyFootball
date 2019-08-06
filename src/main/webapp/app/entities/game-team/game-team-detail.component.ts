import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGameTeam } from 'app/shared/model/game-team.model';

@Component({
  selector: 'jhi-game-team-detail',
  templateUrl: './game-team-detail.component.html'
})
export class GameTeamDetailComponent implements OnInit {
  gameTeam: IGameTeam;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ gameTeam }) => {
      this.gameTeam = gameTeam;
    });
  }

  previousState() {
    window.history.back();
  }
}
