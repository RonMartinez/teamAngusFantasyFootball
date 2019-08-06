/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { RulesComponent } from 'app/entities/rules/rules.component';
import { RulesService } from 'app/entities/rules/rules.service';
import { Rules } from 'app/shared/model/rules.model';

describe('Component Tests', () => {
  describe('Rules Management Component', () => {
    let comp: RulesComponent;
    let fixture: ComponentFixture<RulesComponent>;
    let service: RulesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [RulesComponent],
        providers: []
      })
        .overrideTemplate(RulesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RulesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RulesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Rules(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
