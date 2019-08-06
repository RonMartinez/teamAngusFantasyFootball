import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWeek } from 'app/shared/model/week.model';
import { AccountService } from 'app/core';
import { WeekService } from './week.service';

@Component({
  selector: 'jhi-week',
  templateUrl: './week.component.html'
})
export class WeekComponent implements OnInit, OnDestroy {
  weeks: IWeek[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected weekService: WeekService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.weekService
      .query()
      .pipe(
        filter((res: HttpResponse<IWeek[]>) => res.ok),
        map((res: HttpResponse<IWeek[]>) => res.body)
      )
      .subscribe(
        (res: IWeek[]) => {
          this.weeks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInWeeks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IWeek) {
    return item.id;
  }

  registerChangeInWeeks() {
    this.eventSubscriber = this.eventManager.subscribe('weekListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
