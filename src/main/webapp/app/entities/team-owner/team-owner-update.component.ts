import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeamOwner, TeamOwner } from 'app/shared/model/team-owner.model';
import { TeamOwnerService } from './team-owner.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';
import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from 'app/entities/owner';
import { IWeek } from 'app/shared/model/week.model';
import { WeekService } from 'app/entities/week';

@Component({
  selector: 'jhi-team-owner-update',
  templateUrl: './team-owner-update.component.html'
})
export class TeamOwnerUpdateComponent implements OnInit {
  isSaving: boolean;

  teams: ITeam[];

  owners: IOwner[];

  weeks: IWeek[];

  editForm = this.fb.group({
    id: [],
    name: [],
    team: [],
    owner: [],
    effectiveWeek: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected teamOwnerService: TeamOwnerService,
    protected teamService: TeamService,
    protected ownerService: OwnerService,
    protected weekService: WeekService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ teamOwner }) => {
      this.updateForm(teamOwner);
    });
    this.teamService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeam[]>) => response.body)
      )
      .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.ownerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOwner[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOwner[]>) => response.body)
      )
      .subscribe((res: IOwner[]) => (this.owners = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.weekService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IWeek[]>) => mayBeOk.ok),
        map((response: HttpResponse<IWeek[]>) => response.body)
      )
      .subscribe((res: IWeek[]) => (this.weeks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(teamOwner: ITeamOwner) {
    this.editForm.patchValue({
      id: teamOwner.id,
      name: teamOwner.name,
      team: teamOwner.team,
      owner: teamOwner.owner,
      effectiveWeek: teamOwner.effectiveWeek
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const teamOwner = this.createFromForm();
    if (teamOwner.id !== undefined) {
      this.subscribeToSaveResponse(this.teamOwnerService.update(teamOwner));
    } else {
      this.subscribeToSaveResponse(this.teamOwnerService.create(teamOwner));
    }
  }

  private createFromForm(): ITeamOwner {
    return {
      ...new TeamOwner(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      team: this.editForm.get(['team']).value,
      owner: this.editForm.get(['owner']).value,
      effectiveWeek: this.editForm.get(['effectiveWeek']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamOwner>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTeamById(index: number, item: ITeam) {
    return item.id;
  }

  trackOwnerById(index: number, item: IOwner) {
    return item.id;
  }

  trackWeekById(index: number, item: IWeek) {
    return item.id;
  }
}
