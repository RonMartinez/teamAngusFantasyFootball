import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGameTeam } from 'app/shared/model/game-team.model';
import { AccountService } from 'app/core';
import { GameTeamService } from './game-team.service';

@Component({
  selector: 'jhi-game-team',
  templateUrl: './game-team.component.html'
})
export class GameTeamComponent implements OnInit, OnDestroy {
  gameTeams: IGameTeam[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected gameTeamService: GameTeamService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.gameTeamService
      .query()
      .pipe(
        filter((res: HttpResponse<IGameTeam[]>) => res.ok),
        map((res: HttpResponse<IGameTeam[]>) => res.body)
      )
      .subscribe(
        (res: IGameTeam[]) => {
          this.gameTeams = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGameTeams();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGameTeam) {
    return item.id;
  }

  registerChangeInGameTeams() {
    this.eventSubscriber = this.eventManager.subscribe('gameTeamListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
