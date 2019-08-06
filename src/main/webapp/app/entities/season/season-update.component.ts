import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISeason, Season } from 'app/shared/model/season.model';
import { SeasonService } from './season.service';
import { IRules } from 'app/shared/model/rules.model';
import { RulesService } from 'app/entities/rules';

@Component({
  selector: 'jhi-season-update',
  templateUrl: './season-update.component.html'
})
export class SeasonUpdateComponent implements OnInit {
  isSaving: boolean;

  rules: IRules[];

  editForm = this.fb.group({
    id: [],
    year: [],
    rules: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected seasonService: SeasonService,
    protected rulesService: RulesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ season }) => {
      this.updateForm(season);
    });
    this.rulesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRules[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRules[]>) => response.body)
      )
      .subscribe((res: IRules[]) => (this.rules = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(season: ISeason) {
    this.editForm.patchValue({
      id: season.id,
      year: season.year,
      rules: season.rules
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const season = this.createFromForm();
    if (season.id !== undefined) {
      this.subscribeToSaveResponse(this.seasonService.update(season));
    } else {
      this.subscribeToSaveResponse(this.seasonService.create(season));
    }
  }

  private createFromForm(): ISeason {
    return {
      ...new Season(),
      id: this.editForm.get(['id']).value,
      year: this.editForm.get(['year']).value,
      rules: this.editForm.get(['rules']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeason>>) {
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

  trackRulesById(index: number, item: IRules) {
    return item.id;
  }
}
