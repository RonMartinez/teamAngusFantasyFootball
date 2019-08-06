import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOwner } from 'app/shared/model/owner.model';
import { AccountService } from 'app/core';
import { OwnerService } from './owner.service';

@Component({
  selector: 'jhi-owner',
  templateUrl: './owner.component.html'
})
export class OwnerComponent implements OnInit, OnDestroy {
  owners: IOwner[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ownerService: OwnerService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ownerService
      .query()
      .pipe(
        filter((res: HttpResponse<IOwner[]>) => res.ok),
        map((res: HttpResponse<IOwner[]>) => res.body)
      )
      .subscribe(
        (res: IOwner[]) => {
          this.owners = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOwners();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOwner) {
    return item.id;
  }

  registerChangeInOwners() {
    this.eventSubscriber = this.eventManager.subscribe('ownerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
