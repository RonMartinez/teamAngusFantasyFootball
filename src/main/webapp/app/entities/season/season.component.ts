import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISeason } from 'app/shared/model/season.model';
import { AccountService } from 'app/core';
import { SeasonService } from './season.service';

@Component({
  selector: 'jhi-season',
  templateUrl: './season.component.html'
})
export class SeasonComponent implements OnInit, OnDestroy {
  seasons: ISeason[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected seasonService: SeasonService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.seasonService
      .query()
      .pipe(
        filter((res: HttpResponse<ISeason[]>) => res.ok),
        map((res: HttpResponse<ISeason[]>) => res.body)
      )
      .subscribe(
        (res: ISeason[]) => {
          this.seasons = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSeasons();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeason) {
    return item.id;
  }

  registerChangeInSeasons() {
    this.eventSubscriber = this.eventManager.subscribe('seasonListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
