import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWeek } from 'app/shared/model/week.model';
import { WeekService } from './week.service';

@Component({
  selector: 'jhi-week-delete-dialog',
  templateUrl: './week-delete-dialog.component.html'
})
export class WeekDeleteDialogComponent {
  week: IWeek;

  constructor(protected weekService: WeekService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.weekService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'weekListModification',
        content: 'Deleted an week'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-week-delete-popup',
  template: ''
})
export class WeekDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ week }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(WeekDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.week = week;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/week', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/week', { outlets: { popup: null } }]);
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
