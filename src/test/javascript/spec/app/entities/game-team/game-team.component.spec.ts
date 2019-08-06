/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { GameTeamComponent } from 'app/entities/game-team/game-team.component';
import { GameTeamService } from 'app/entities/game-team/game-team.service';
import { GameTeam } from 'app/shared/model/game-team.model';

describe('Component Tests', () => {
  describe('GameTeam Management Component', () => {
    let comp: GameTeamComponent;
    let fixture: ComponentFixture<GameTeamComponent>;
    let service: GameTeamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [GameTeamComponent],
        providers: []
      })
        .overrideTemplate(GameTeamComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GameTeamComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameTeamService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GameTeam(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gameTeams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
