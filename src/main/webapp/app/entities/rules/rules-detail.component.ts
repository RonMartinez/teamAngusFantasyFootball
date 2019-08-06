import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRules } from 'app/shared/model/rules.model';

@Component({
  selector: 'jhi-rules-detail',
  templateUrl: './rules-detail.component.html'
})
export class RulesDetailComponent implements OnInit {
  rules: IRules;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rules }) => {
      this.rules = rules;
    });
  }

  previousState() {
    window.history.back();
  }
}
