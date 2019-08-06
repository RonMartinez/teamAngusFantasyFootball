/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { GameTeamUpdateComponent } from 'app/entities/game-team/game-team-update.component';
import { GameTeamService } from 'app/entities/game-team/game-team.service';
import { GameTeam } from 'app/shared/model/game-team.model';

describe('Component Tests', () => {
  describe('GameTeam Management Update Component', () => {
    let comp: GameTeamUpdateComponent;
    let fixture: ComponentFixture<GameTeamUpdateComponent>;
    let service: GameTeamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [GameTeamUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GameTeamUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GameTeamUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameTeamService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GameTeam(123);
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
        const entity = new GameTeam();
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
