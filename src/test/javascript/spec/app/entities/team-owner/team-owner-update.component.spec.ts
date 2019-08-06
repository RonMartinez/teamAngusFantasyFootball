/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { TeamOwnerUpdateComponent } from 'app/entities/team-owner/team-owner-update.component';
import { TeamOwnerService } from 'app/entities/team-owner/team-owner.service';
import { TeamOwner } from 'app/shared/model/team-owner.model';

describe('Component Tests', () => {
  describe('TeamOwner Management Update Component', () => {
    let comp: TeamOwnerUpdateComponent;
    let fixture: ComponentFixture<TeamOwnerUpdateComponent>;
    let service: TeamOwnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [TeamOwnerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TeamOwnerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeamOwnerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeamOwnerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TeamOwner(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TeamOwner();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
