import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamAngusFantasyFootballSharedModule } from 'app/shared';
import {
  WeekComponent,
  WeekDetailComponent,
  WeekUpdateComponent,
  WeekDeletePopupComponent,
  WeekDeleteDialogComponent,
  weekRoute,
  weekPopupRoute
} from './';

const ENTITY_STATES = [...weekRoute, ...weekPopupRoute];

@NgModule({
  imports: [TeamAngusFantasyFootballSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [WeekComponent, WeekDetailComponent, WeekUpdateComponent, WeekDeleteDialogComponent, WeekDeletePopupComponent],
  entryComponents: [WeekComponent, WeekUpdateComponent, WeekDeleteDialogComponent, WeekDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballWeekModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
