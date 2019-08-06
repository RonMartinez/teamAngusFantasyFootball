/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { RulesDetailComponent } from 'app/entities/rules/rules-detail.component';
import { Rules } from 'app/shared/model/rules.model';

describe('Component Tests', () => {
  describe('Rules Management Detail Component', () => {
    let comp: RulesDetailComponent;
    let fixture: ComponentFixture<RulesDetailComponent>;
    const route = ({ data: of({ rules: new Rules(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [RulesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RulesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RulesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rules).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
