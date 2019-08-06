/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { GameTeamDetailComponent } from 'app/entities/game-team/game-team-detail.component';
import { GameTeam } from 'app/shared/model/game-team.model';

describe('Component Tests', () => {
  describe('GameTeam Management Detail Component', () => {
    let comp: GameTeamDetailComponent;
    let fixture: ComponentFixture<GameTeamDetailComponent>;
    const route = ({ data: of({ gameTeam: new GameTeam(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [GameTeamDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GameTeamDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GameTeamDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gameTeam).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
