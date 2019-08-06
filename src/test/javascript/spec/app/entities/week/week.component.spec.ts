/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { WeekComponent } from 'app/entities/week/week.component';
import { WeekService } from 'app/entities/week/week.service';
import { Week } from 'app/shared/model/week.model';

describe('Component Tests', () => {
  describe('Week Management Component', () => {
    let comp: WeekComponent;
    let fixture: ComponentFixture<WeekComponent>;
    let service: WeekService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [WeekComponent],
        providers: []
      })
        .overrideTemplate(WeekComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WeekComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WeekService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Week(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.weeks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
