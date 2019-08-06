/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { RulesUpdateComponent } from 'app/entities/rules/rules-update.component';
import { RulesService } from 'app/entities/rules/rules.service';
import { Rules } from 'app/shared/model/rules.model';

describe('Component Tests', () => {
  describe('Rules Management Update Component', () => {
    let comp: RulesUpdateComponent;
    let fixture: ComponentFixture<RulesUpdateComponent>;
    let service: RulesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [RulesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RulesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RulesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RulesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Rules(123);
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
        const entity = new Rules();
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
