import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'owner',
        loadChildren: () => import('./owner/owner.module').then(m => m.TeamAngusFantasyFootballOwnerModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.TeamAngusFantasyFootballTeamModule)
      },
      {
        path: 'team-owner',
        loadChildren: () => import('./team-owner/team-owner.module').then(m => m.TeamAngusFantasyFootballTeamOwnerModule)
      },
      {
        path: 'rules',
        loadChildren: () => import('./rules/rules.module').then(m => m.TeamAngusFantasyFootballRulesModule)
      },
      {
        path: 'season',
        loadChildren: () => import('./season/season.module').then(m => m.TeamAngusFantasyFootballSeasonModule)
      },
      {
        path: 'week',
        loadChildren: () => import('./week/week.module').then(m => m.TeamAngusFantasyFootballWeekModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.TeamAngusFantasyFootballGameModule)
      },
      {
        path: 'game-team',
        loadChildren: () => import('./game-team/game-team.module').then(m => m.TeamAngusFantasyFootballGameTeamModule)
      },
      {
        path: 'season-team',
        loadChildren: () => import('./season-team/season-team.module').then(m => m.TeamAngusFantasyFootballSeasonTeamModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamAngusFantasyFootballEntityModule {}
