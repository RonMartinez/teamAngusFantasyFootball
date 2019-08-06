import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameTeam } from 'app/shared/model/game-team.model';
import { GameTeamService } from './game-team.service';
import { GameTeamComponent } from './game-team.component';
import { GameTeamDetailComponent } from './game-team-detail.component';
import { GameTeamUpdateComponent } from './game-team-update.component';
import { GameTeamDeletePopupComponent } from './game-team-delete-dialog.component';
import { IGameTeam } from 'app/shared/model/game-team.model';

@Injectable({ providedIn: 'root' })
export class GameTeamResolve implements Resolve<IGameTeam> {
  constructor(private service: GameTeamService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGameTeam> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GameTeam>) => response.ok),
        map((gameTeam: HttpResponse<GameTeam>) => gameTeam.body)
      );
    }
    return of(new GameTeam());
  }
}

export const gameTeamRoute: Routes = [
  {
    path: '',
    component: GameTeamComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.gameTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GameTeamDetailComponent,
    resolve: {
      gameTeam: GameTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.gameTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GameTeamUpdateComponent,
    resolve: {
      gameTeam: GameTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.gameTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GameTeamUpdateComponent,
    resolve: {
      gameTeam: GameTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.gameTeam.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const gameTeamPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GameTeamDeletePopupComponent,
    resolve: {
      gameTeam: GameTeamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.gameTeam.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
