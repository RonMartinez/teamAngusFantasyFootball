import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TeamOwner } from 'app/shared/model/team-owner.model';
import { TeamOwnerService } from './team-owner.service';
import { TeamOwnerComponent } from './team-owner.component';
import { TeamOwnerDetailComponent } from './team-owner-detail.component';
import { TeamOwnerUpdateComponent } from './team-owner-update.component';
import { TeamOwnerDeletePopupComponent } from './team-owner-delete-dialog.component';
import { ITeamOwner } from 'app/shared/model/team-owner.model';

@Injectable({ providedIn: 'root' })
export class TeamOwnerResolve implements Resolve<ITeamOwner> {
  constructor(private service: TeamOwnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeamOwner> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TeamOwner>) => response.ok),
        map((teamOwner: HttpResponse<TeamOwner>) => teamOwner.body)
      );
    }
    return of(new TeamOwner());
  }
}

export const teamOwnerRoute: Routes = [
  {
    path: '',
    component: TeamOwnerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.teamOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeamOwnerDetailComponent,
    resolve: {
      teamOwner: TeamOwnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.teamOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeamOwnerUpdateComponent,
    resolve: {
      teamOwner: TeamOwnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.teamOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeamOwnerUpdateComponent,
    resolve: {
      teamOwner: TeamOwnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.teamOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const teamOwnerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TeamOwnerDeletePopupComponent,
    resolve: {
      teamOwner: TeamOwnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.teamOwner.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
