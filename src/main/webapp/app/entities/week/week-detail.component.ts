import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWeek } from 'app/shared/model/week.model';

@Component({
  selector: 'jhi-week-detail',
  templateUrl: './week-detail.component.html'
})
export class WeekDetailComponent implements OnInit {
  week: IWeek;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ week }) => {
      this.week = week;
    });
  }

  previousState() {
    window.history.back();
  }
}
