import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamAngusFantasyFootballSharedModule } from 'app/shared';
import {
  RulesComponent,
  RulesDetailComponent,
  RulesUpdateComponent,
  RulesDeletePopupComponent,
  RulesDeleteDialogComponent,
  rulesRoute,
  rulesPopupRoute
} from './';

const ENTITY_STATES = [...rulesRoute, ...rulesPopupRoute];

@NgModule({
  imports: [TeamAngusFantasyFootballSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RulesComponent, RulesDetailComponent, RulesUpdateComponent, RulesDeleteDialogComponent, RulesDeletePopupComponent],
  entryComponents: [RulesComponent, RulesUpdateComponent, RulesDeleteDialogComponent, RulesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballRulesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
