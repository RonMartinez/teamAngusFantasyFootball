/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TeamAngusFantasyFootballTestModule } from '../../../test.module';
import { TeamOwnerComponent } from 'app/entities/team-owner/team-owner.component';
import { TeamOwnerService } from 'app/entities/team-owner/team-owner.service';
import { TeamOwner } from 'app/shared/model/team-owner.model';

describe('Component Tests', () => {
  describe('TeamOwner Management Component', () => {
    let comp: TeamOwnerComponent;
    let fixture: ComponentFixture<TeamOwnerComponent>;
    let service: TeamOwnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TeamAngusFantasyFootballTestModule],
        declarations: [TeamOwnerComponent],
        providers: []
      })
        .overrideTemplate(TeamOwnerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeamOwnerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeamOwnerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TeamOwner(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.teamOwners[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
