import { NgModule } from '@angular/core';

import { TeamAngusFantasyFootballSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [TeamAngusFantasyFootballSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
  exports: [TeamAngusFantasyFootballSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TeamAngusFantasyFootballSharedCommonModule {}
