import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TeamAngusFantasyFootballSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TeamAngusFantasyFootballSharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [TeamAngusFantasyFootballSharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballSharedModule {
  static forRoot() {
    return {
      ngModule: TeamAngusFantasyFootballSharedModule
    };
  }
}
