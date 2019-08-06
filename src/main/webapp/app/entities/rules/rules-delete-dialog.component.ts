import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRules } from 'app/shared/model/rules.model';
import { RulesService } from './rules.service';

@Component({
  selector: 'jhi-rules-delete-dialog',
  templateUrl: './rules-delete-dialog.component.html'
})
export class RulesDeleteDialogComponent {
  rules: IRules;

  constructor(protected rulesService: RulesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rulesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rulesListModification',
        content: 'Deleted an rules'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rules-delete-popup',
  template: ''
})
export class RulesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rules }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RulesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rules = rules;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rules', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rules', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
