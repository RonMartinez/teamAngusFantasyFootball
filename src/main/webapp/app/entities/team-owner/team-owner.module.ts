import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamAngusFantasyFootballSharedModule } from 'app/shared';
import {
  TeamOwnerComponent,
  TeamOwnerDetailComponent,
  TeamOwnerUpdateComponent,
  TeamOwnerDeletePopupComponent,
  TeamOwnerDeleteDialogComponent,
  teamOwnerRoute,
  teamOwnerPopupRoute
} from './';

const ENTITY_STATES = [...teamOwnerRoute, ...teamOwnerPopupRoute];

@NgModule({
  imports: [TeamAngusFantasyFootballSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TeamOwnerComponent,
    TeamOwnerDetailComponent,
    TeamOwnerUpdateComponent,
    TeamOwnerDeleteDialogComponent,
    TeamOwnerDeletePopupComponent
  ],
  entryComponents: [TeamOwnerComponent, TeamOwnerUpdateComponent, TeamOwnerDeleteDialogComponent, TeamOwnerDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballTeamOwnerModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
