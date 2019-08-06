import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGameTeam } from 'app/shared/model/game-team.model';
import { GameTeamService } from './game-team.service';

@Component({
  selector: 'jhi-game-team-delete-dialog',
  templateUrl: './game-team-delete-dialog.component.html'
})
export class GameTeamDeleteDialogComponent {
  gameTeam: IGameTeam;

  constructor(protected gameTeamService: GameTeamService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.gameTeamService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'gameTeamListModification',
        content: 'Deleted an gameTeam'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-game-team-delete-popup',
  template: ''
})
export class GameTeamDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ gameTeam }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GameTeamDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.gameTeam = gameTeam;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/game-team', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/game-team', { outlets: { popup: null } }]);
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
