/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { WeekDetailComponent } from 'app/entities/week/week-detail.component';
import { Week } from 'app/shared/model/week.model';

describe('Component Tests', () => {
  describe('Week Management Detail Component', () => {
    let comp: WeekDetailComponent;
    let fixture: ComponentFixture<WeekDetailComponent>;
    const route = ({ data: of({ week: new Week(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [WeekDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WeekDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WeekDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.week).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
