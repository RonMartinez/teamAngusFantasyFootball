import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeasonTeam } from 'app/shared/model/season-team.model';

@Component({
  selector: 'jhi-season-team-detail',
  templateUrl: './season-team-detail.component.html'
})
export class SeasonTeamDetailComponent implements OnInit {
  seasonTeam: ISeasonTeam;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ seasonTeam }) => {
      this.seasonTeam = seasonTeam;
    });
  }

  previousState() {
    window.history.back();
  }
}
