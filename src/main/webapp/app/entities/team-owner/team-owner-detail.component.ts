import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamOwner } from 'app/shared/model/team-owner.model';

@Component({
  selector: 'jhi-team-owner-detail',
  templateUrl: './team-owner-detail.component.html'
})
export class TeamOwnerDetailComponent implements OnInit {
  teamOwner: ITeamOwner;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teamOwner }) => {
      this.teamOwner = teamOwner;
    });
  }

  previousState() {
    window.history.back();
  }
}
