import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from './season.service';

@Component({
  selector: 'jhi-season-delete-dialog',
  templateUrl: './season-delete-dialog.component.html'
})
export class SeasonDeleteDialogComponent {
  season: ISeason;

  constructor(protected seasonService: SeasonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.seasonService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'seasonListModification',
        content: 'Deleted an season'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-season-delete-popup',
  template: ''
})
export class SeasonDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ season }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SeasonDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.season = season;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/season', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/season', { outlets: { popup: null } }]);
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
