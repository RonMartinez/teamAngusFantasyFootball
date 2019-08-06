/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { SeasonTeamDeleteDialogComponent } from 'app/entities/season-team/season-team-delete-dialog.component';
import { SeasonTeamService } from 'app/entities/season-team/season-team.service';

describe('Component Tests', () => {
  describe('SeasonTeam Management Delete Component', () => {
    let comp: SeasonTeamDeleteDialogComponent;
    let fixture: ComponentFixture<SeasonTeamDeleteDialogComponent>;
    let service: SeasonTeamService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [SeasonTeamDeleteDialogComponent]
      })
        .overrideTemplate(SeasonTeamDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeasonTeamDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeasonTeamService);
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
