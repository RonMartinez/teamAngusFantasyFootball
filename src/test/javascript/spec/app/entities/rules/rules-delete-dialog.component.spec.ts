/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { RulesDeleteDialogComponent } from 'app/entities/rules/rules-delete-dialog.component';
import { RulesService } from 'app/entities/rules/rules.service';

describe('Component Tests', () => {
  describe('Rules Management Delete Component', () => {
    let comp: RulesDeleteDialogComponent;
    let fixture: ComponentFixture<RulesDeleteDialogComponent>;
    let service: RulesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [RulesDeleteDialogComponent]
      })
        .overrideTemplate(RulesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RulesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RulesService);
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
