import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRules } from 'app/shared/model/rules.model';
import { AccountService } from 'app/core';
import { RulesService } from './rules.service';

@Component({
  selector: 'jhi-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit, OnDestroy {
  rules: IRules[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rulesService: RulesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rulesService
      .query()
      .pipe(
        filter((res: HttpResponse<IRules[]>) => res.ok),
        map((res: HttpResponse<IRules[]>) => res.body)
      )
      .subscribe(
        (res: IRules[]) => {
          this.rules = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRules();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRules) {
    return item.id;
  }

  registerChangeInRules() {
    this.eventSubscriber = this.eventManager.subscribe('rulesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
