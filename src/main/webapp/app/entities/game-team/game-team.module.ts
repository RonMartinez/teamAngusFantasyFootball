import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamAngusFantasyFootballSharedModule } from 'app/shared';
import {
  GameTeamComponent,
  GameTeamDetailComponent,
  GameTeamUpdateComponent,
  GameTeamDeletePopupComponent,
  GameTeamDeleteDialogComponent,
  gameTeamRoute,
  gameTeamPopupRoute
} from './';

const ENTITY_STATES = [...gameTeamRoute, ...gameTeamPopupRoute];

@NgModule({
  imports: [TeamAngusFantasyFootballSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GameTeamComponent,
    GameTeamDetailComponent,
    GameTeamUpdateComponent,
    GameTeamDeleteDialogComponent,
    GameTeamDeletePopupComponent
  ],
  entryComponents: [GameTeamComponent, GameTeamUpdateComponent, GameTeamDeleteDialogComponent, GameTeamDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballGameTeamModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
