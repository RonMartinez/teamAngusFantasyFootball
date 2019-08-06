import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SeasonTeam } from 'app/shared/model/season-team.model';
import { SeasonTeamService } from './season-team.service';
import { SeasonTeamComponent } from './season-team.component';
import { SeasonTeamDetailComponent } from './season-team-detail.component';
import { SeasonTeamUpdateComponent } from './season-team-update.component';
import { SeasonTeamDeletePopupComponent } from './season-team-delete-dialog.component';
import { ISeasonTeam } from 'app/shared/model/season-team.model';

@Injectable({ providedIn: 'root' })
export class SeasonTeamResolve implements Resolve<ISeasonTeam> {
  constructor(private service: SeasonTeamService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISeasonTeam> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SeasonTeam>) => response.ok),
        map((seasonTeam: HttpResponse<SeasonTeam>) => seasonTeam.body)
      );
    }
    return of(new SeasonTeam());
  }
}

export const seasonTeamRoute: Routes = [
  {
    path: '',
    component: SeasonTeamComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.seasonTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SeasonTeamDetailComponent,
    resolve: {
      seasonTeam: SeasonTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.seasonTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SeasonTeamUpdateComponent,
    resolve: {
      seasonTeam: SeasonTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.seasonTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SeasonTeamUpdateComponent,
    resolve: {
      seasonTeam: SeasonTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.seasonTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const seasonTeamPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SeasonTeamDeletePopupComponent,
    resolve: {
      seasonTeam: SeasonTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.seasonTeam.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
