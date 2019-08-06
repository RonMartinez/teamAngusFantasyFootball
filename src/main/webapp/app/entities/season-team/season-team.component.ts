import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISeasonTeam } from 'app/shared/model/season-team.model';
import { AccountService } from 'app/core';
import { SeasonTeamService } from './season-team.service';

@Component({
  selector: 'jhi-season-team',
  templateUrl: './season-team.component.html'
})
export class SeasonTeamComponent implements OnInit, OnDestroy {
  seasonTeams: ISeasonTeam[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected seasonTeamService: SeasonTeamService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.seasonTeamService
      .query()
      .pipe(
        filter((res: HttpResponse<ISeasonTeam[]>) => res.ok),
        map((res: HttpResponse<ISeasonTeam[]>) => res.body)
      )
      .subscribe(
        (res: ISeasonTeam[]) => {
          this.seasonTeams = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSeasonTeams();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeasonTeam) {
    return item.id;
  }

  registerChangeInSeasonTeams() {
    this.eventSubscriber = this.eventManager.subscribe('seasonTeamListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
