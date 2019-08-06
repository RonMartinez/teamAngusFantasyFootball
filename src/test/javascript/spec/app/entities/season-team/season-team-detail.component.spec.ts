/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { SeasonTeamDetailComponent } from 'app/entities/season-team/season-team-detail.component';
import { SeasonTeam } from 'app/shared/model/season-team.model';

describe('Component Tests', () => {
  describe('SeasonTeam Management Detail Component', () => {
    let comp: SeasonTeamDetailComponent;
    let fixture: ComponentFixture<SeasonTeamDetailComponent>;
    const route = ({ data: of({ seasonTeam: new SeasonTeam(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [SeasonTeamDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SeasonTeamDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeasonTeamDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.seasonTeam).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
