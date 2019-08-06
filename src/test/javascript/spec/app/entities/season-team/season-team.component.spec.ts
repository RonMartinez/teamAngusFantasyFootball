/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { SeasonTeamComponent } from 'app/entities/season-team/season-team.component';
import { SeasonTeamService } from 'app/entities/season-team/season-team.service';
import { SeasonTeam } from 'app/shared/model/season-team.model';

describe('Component Tests', () => {
  describe('SeasonTeam Management Component', () => {
    let comp: SeasonTeamComponent;
    let fixture: ComponentFixture<SeasonTeamComponent>;
    let service: SeasonTeamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [SeasonTeamComponent],
        providers: []
      })
        .overrideTemplate(SeasonTeamComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeasonTeamComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeasonTeamService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SeasonTeam(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.seasonTeams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
