import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeasonTeam } from 'app/shared/model/season-team.model';
import { SeasonTeamService } from './season-team.service';

@Component({
  selector: 'jhi-season-team-delete-dialog',
  templateUrl: './season-team-delete-dialog.component.html'
})
export class SeasonTeamDeleteDialogComponent {
  seasonTeam: ISeasonTeam;

  constructor(
    protected seasonTeamService: SeasonTeamService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.seasonTeamService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'seasonTeamListModification',
        content: 'Deleted an seasonTeam'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-season-team-delete-popup',
  template: ''
})
export class SeasonTeamDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ seasonTeam }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SeasonTeamDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.seasonTeam = seasonTeam;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/season-team', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/season-team', { outlets: { popup: null } }]);
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
