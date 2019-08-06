import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Week } from 'app/shared/model/week.model';
import { WeekService } from './week.service';
import { WeekComponent } from './week.component';
import { WeekDetailComponent } from './week-detail.component';
import { WeekUpdateComponent } from './week-update.component';
import { WeekDeletePopupComponent } from './week-delete-dialog.component';
import { IWeek } from 'app/shared/model/week.model';

@Injectable({ providedIn: 'root' })
export class WeekResolve implements Resolve<IWeek> {
  constructor(private service: WeekService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWeek> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Week>) => response.ok),
        map((week: HttpResponse<Week>) => week.body)
      );
    }
    return of(new Week());
  }
}

export const weekRoute: Routes = [
  {
    path: '',
    component: WeekComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.week.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WeekDetailComponent,
    resolve: {
      week: WeekResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.week.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WeekUpdateComponent,
    resolve: {
      week: WeekResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.week.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WeekUpdateComponent,
    resolve: {
      week: WeekResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.week.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const weekPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: WeekDeletePopupComponent,
    resolve: {
      week: WeekResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.week.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
