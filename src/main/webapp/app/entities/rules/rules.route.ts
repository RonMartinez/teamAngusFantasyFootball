import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Rules } from 'app/shared/model/rules.model';
import { RulesService } from './rules.service';
import { RulesComponent } from './rules.component';
import { RulesDetailComponent } from './rules-detail.component';
import { RulesUpdateComponent } from './rules-update.component';
import { RulesDeletePopupComponent } from './rules-delete-dialog.component';
import { IRules } from 'app/shared/model/rules.model';

@Injectable({ providedIn: 'root' })
export class RulesResolve implements Resolve<IRules> {
  constructor(private service: RulesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRules> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Rules>) => response.ok),
        map((rules: HttpResponse<Rules>) => rules.body)
      );
    }
    return of(new Rules());
  }
}

export const rulesRoute: Routes = [
  {
    path: '',
    component: RulesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.rules.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RulesDetailComponent,
    resolve: {
      rules: RulesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.rules.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RulesUpdateComponent,
    resolve: {
      rules: RulesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.rules.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RulesUpdateComponent,
    resolve: {
      rules: RulesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.rules.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rulesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RulesDeletePopupComponent,
    resolve: {
      rules: RulesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'teamAngusFantasyFootballApp.rules.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
