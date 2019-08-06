/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { TeamOwnerDeleteDialogComponent } from 'app/entities/team-owner/team-owner-delete-dialog.component';
import { TeamOwnerService } from 'app/entities/team-owner/team-owner.service';

describe('Component Tests', () => {
  describe('TeamOwner Management Delete Component', () => {
    let comp: TeamOwnerDeleteDialogComponent;
    let fixture: ComponentFixture<TeamOwnerDeleteDialogComponent>;
    let service: TeamOwnerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [TeamOwnerDeleteDialogComponent]
      })
        .overrideTemplate(TeamOwnerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeamOwnerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeamOwnerService);
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
