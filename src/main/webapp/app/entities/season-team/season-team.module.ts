import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamAngusFantasyFootballSharedModule } from 'app/shared';
import {
  SeasonTeamComponent,
  SeasonTeamDetailComponent,
  SeasonTeamUpdateComponent,
  SeasonTeamDeletePopupComponent,
  SeasonTeamDeleteDialogComponent,
  seasonTeamRoute,
  seasonTeamPopupRoute
} from './';

const ENTITY_STATES = [...seasonTeamRoute, ...seasonTeamPopupRoute];

@NgModule({
  imports: [TeamAngusFantasyFootballSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SeasonTeamComponent,
    SeasonTeamDetailComponent,
    SeasonTeamUpdateComponent,
    SeasonTeamDeleteDialogComponent,
    SeasonTeamDeletePopupComponent
  ],
  entryComponents: [SeasonTeamComponent, SeasonTeamUpdateComponent, SeasonTeamDeleteDialogComponent, SeasonTeamDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballSeasonTeamModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
