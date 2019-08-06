import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISeasonTeam, SeasonTeam } from 'app/shared/model/season-team.model';
import { SeasonTeamService } from './season-team.service';
import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from 'app/entities/season';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
  selector: 'jhi-season-team-update',
  templateUrl: './season-team-update.component.html'
})
export class SeasonTeamUpdateComponent implements OnInit {
  isSaving: boolean;

  seasons: ISeason[];

  teams: ITeam[];

  editForm = this.fb.group({
    id: [],
    year: [],
    season: [],
    team: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected seasonTeamService: SeasonTeamService,
    protected seasonService: SeasonService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ seasonTeam }) => {
      this.updateForm(seasonTeam);
    });
    this.seasonService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISeason[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISeason[]>) => response.body)
      )
      .subscribe((res: ISeason[]) => (this.seasons = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.teamService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeam[]>) => response.body)
      )
      .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(seasonTeam: ISeasonTeam) {
    this.editForm.patchValue({
      id: seasonTeam.id,
      year: seasonTeam.year,
      season: seasonTeam.season,
      team: seasonTeam.team
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const seasonTeam = this.createFromForm();
    if (seasonTeam.id !== undefined) {
      this.subscribeToSaveResponse(this.seasonTeamService.update(seasonTeam));
    } else {
      this.subscribeToSaveResponse(this.seasonTeamService.create(seasonTeam));
    }
  }

  private createFromForm(): ISeasonTeam {
    return {
      ...new SeasonTeam(),
      id: this.editForm.get(['id']).value,
      year: this.editForm.get(['year']).value,
      season: this.editForm.get(['season']).value,
      team: this.editForm.get(['team']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeasonTeam>>) {
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

  trackSeasonById(index: number, item: ISeason) {
    return item.id;
  }

  trackTeamById(index: number, item: ITeam) {
    return item.id;
  }
}
