import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IWeek, Week } from 'app/shared/model/week.model';
import { WeekService } from './week.service';
import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from 'app/entities/season';

@Component({
  selector: 'jhi-week-update',
  templateUrl: './week-update.component.html'
})
export class WeekUpdateComponent implements OnInit {
  isSaving: boolean;

  seasons: ISeason[];

  editForm = this.fb.group({
    id: [],
    playoffs: [],
    championship: [],
    season: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected weekService: WeekService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ week }) => {
      this.updateForm(week);
    });
    this.seasonService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISeason[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISeason[]>) => response.body)
      )
      .subscribe((res: ISeason[]) => (this.seasons = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(week: IWeek) {
    this.editForm.patchValue({
      id: week.id,
      playoffs: week.playoffs,
      championship: week.championship,
      season: week.season
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const week = this.createFromForm();
    if (week.id !== undefined) {
      this.subscribeToSaveResponse(this.weekService.update(week));
    } else {
      this.subscribeToSaveResponse(this.weekService.create(week));
    }
  }

  private createFromForm(): IWeek {
    return {
      ...new Week(),
      id: this.editForm.get(['id']).value,
      playoffs: this.editForm.get(['playoffs']).value,
      championship: this.editForm.get(['championship']).value,
      season: this.editForm.get(['season']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWeek>>) {
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
}
