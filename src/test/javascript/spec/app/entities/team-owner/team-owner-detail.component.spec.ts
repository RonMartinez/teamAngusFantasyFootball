/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { TeamOwnerDetailComponent } from 'app/entities/team-owner/team-owner-detail.component';
import { TeamOwner } from 'app/shared/model/team-owner.model';

describe('Component Tests', () => {
  describe('TeamOwner Management Detail Component', () => {
    let comp: TeamOwnerDetailComponent;
    let fixture: ComponentFixture<TeamOwnerDetailComponent>;
    const route = ({ data: of({ teamOwner: new TeamOwner(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [TeamOwnerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TeamOwnerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeamOwnerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.teamOwner).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
