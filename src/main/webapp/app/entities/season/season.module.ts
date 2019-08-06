import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamAngusFantasyFootballSharedModule } from 'app/shared';
import {
  SeasonComponent,
  SeasonDetailComponent,
  SeasonUpdateComponent,
  SeasonDeletePopupComponent,
  SeasonDeleteDialogComponent,
  seasonRoute,
  seasonPopupRoute
} from './';

const ENTITY_STATES = [...seasonRoute, ...seasonPopupRoute];

@NgModule({
  imports: [TeamAngusFantasyFootballSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SeasonComponent, SeasonDetailComponent, SeasonUpdateComponent, SeasonDeleteDialogComponent, SeasonDeletePopupComponent],
  entryComponents: [SeasonComponent, SeasonUpdateComponent, SeasonDeleteDialogComponent, SeasonDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballSeasonModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
