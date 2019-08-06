import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeamOwner } from 'app/shared/model/team-owner.model';
import { TeamOwnerService } from './team-owner.service';

@Component({
  selector: 'jhi-team-owner-delete-dialog',
  templateUrl: './team-owner-delete-dialog.component.html'
})
export class TeamOwnerDeleteDialogComponent {
  teamOwner: ITeamOwner;

  constructor(protected teamOwnerService: TeamOwnerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.teamOwnerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'teamOwnerListModification',
        content: 'Deleted an teamOwner'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-team-owner-delete-popup',
  template: ''
})
export class TeamOwnerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teamOwner }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TeamOwnerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.teamOwner = teamOwner;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/team-owner', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/team-owner', { outlets: { popup: null } }]);
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
