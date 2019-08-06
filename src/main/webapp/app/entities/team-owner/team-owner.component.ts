import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeamOwner } from 'app/shared/model/team-owner.model';
import { AccountService } from 'app/core';
import { TeamOwnerService } from './team-owner.service';

@Component({
  selector: 'jhi-team-owner',
  templateUrl: './team-owner.component.html'
})
export class TeamOwnerComponent implements OnInit, OnDestroy {
  teamOwners: ITeamOwner[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected teamOwnerService: TeamOwnerService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.teamOwnerService
      .query()
      .pipe(
        filter((res: HttpResponse<ITeamOwner[]>) => res.ok),
        map((res: HttpResponse<ITeamOwner[]>) => res.body)
      )
      .subscribe(
        (res: ITeamOwner[]) => {
          this.teamOwners = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTeamOwners();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITeamOwner) {
    return item.id;
  }

  registerChangeInTeamOwners() {
    this.eventSubscriber = this.eventManager.subscribe('teamOwnerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
