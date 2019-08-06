import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGame } from 'app/shared/model/game.model';
import { AccountService } from 'app/core';
import { GameService } from './game.service';

@Component({
  selector: 'jhi-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {
  games: IGame[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected gameService: GameService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.gameService
      .query()
      .pipe(
        filter((res: HttpResponse<IGame[]>) => res.ok),
        map((res: HttpResponse<IGame[]>) => res.body)
      )
      .subscribe(
        (res: IGame[]) => {
          this.games = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGames();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGame) {
    return item.id;
  }

  registerChangeInGames() {
    this.eventSubscriber = this.eventManager.subscribe('gameListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
