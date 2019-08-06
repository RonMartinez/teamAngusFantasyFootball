/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { WeekDeleteDialogComponent } from 'app/entities/week/week-delete-dialog.component';
import { WeekService } from 'app/entities/week/week.service';

describe('Component Tests', () => {
  describe('Week Management Delete Component', () => {
    let comp: WeekDeleteDialogComponent;
    let fixture: ComponentFixture<WeekDeleteDialogComponent>;
    let service: WeekService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [WeekDeleteDialogComponent]
      })
        .overrideTemplate(WeekDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WeekDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WeekService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
