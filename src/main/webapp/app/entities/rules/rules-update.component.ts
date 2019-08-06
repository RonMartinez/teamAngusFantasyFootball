import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRules, Rules } from 'app/shared/model/rules.model';
import { RulesService } from './rules.service';

@Component({
  selector: 'jhi-rules-update',
  templateUrl: './rules-update.component.html'
})
export class RulesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    description: []
  });

  constructor(protected rulesService: RulesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rules }) => {
      this.updateForm(rules);
    });
  }

  updateForm(rules: IRules) {
    this.editForm.patchValue({
      id: rules.id,
      description: rules.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rules = this.createFromForm();
    if (rules.id !== undefined) {
      this.subscribeToSaveResponse(this.rulesService.update(rules));
    } else {
      this.subscribeToSaveResponse(this.rulesService.create(rules));
    }
  }

  private createFromForm(): IRules {
    return {
      ...new Rules(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRules>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
