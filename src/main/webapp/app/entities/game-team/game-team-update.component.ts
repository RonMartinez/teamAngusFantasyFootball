import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGameTeam, GameTeam } from 'app/shared/model/game-team.model';
import { GameTeamService } from './game-team.service';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
  selector: 'jhi-game-team-update',
  templateUrl: './game-team-update.component.html'
})
export class GameTeamUpdateComponent implements OnInit {
  isSaving: boolean;

  games: IGame[];

  teams: ITeam[];

  editForm = this.fb.group({
    id: [],
    score: [],
    game: [],
    team: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected gameTeamService: GameTeamService,
    protected gameService: GameService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ gameTeam }) => {
      this.updateForm(gameTeam);
    });
    this.gameService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGame[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGame[]>) => response.body)
      )
      .subscribe((res: IGame[]) => (this.games = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.teamService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeam[]>) => response.body)
      )
      .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(gameTeam: IGameTeam) {
    this.editForm.patchValue({
      id: gameTeam.id,
      score: gameTeam.score,
      game: gameTeam.game,
      team: gameTeam.team
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const gameTeam = this.createFromForm();
    if (gameTeam.id !== undefined) {
      this.subscribeToSaveResponse(this.gameTeamService.update(gameTeam));
    } else {
      this.subscribeToSaveResponse(this.gameTeamService.create(gameTeam));
    }
  }

  private createFromForm(): IGameTeam {
    return {
      ...new GameTeam(),
      id: this.editForm.get(['id']).value,
      score: this.editForm.get(['score']).value,
      game: this.editForm.get(['game']).value,
      team: this.editForm.get(['team']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGameTeam>>) {
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

  trackGameById(index: number, item: IGame) {
    return item.id;
  }

  trackTeamById(index: number, item: ITeam) {
    return item.id;
  }
}
