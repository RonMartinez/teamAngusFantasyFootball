import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGameTeam } from 'app/shared/model/game-team.model';

type EntityResponseType = HttpResponse<IGameTeam>;
type EntityArrayResponseType = HttpResponse<IGameTeam[]>;

@Injectable({ providedIn: 'root' })
export class GameTeamService {
  public resourceUrl = SERVER_API_URL + 'api/game-teams';

  constructor(protected http: HttpClient) {}

  create(gameTeam: IGameTeam): Observable<EntityResponseType> {
    return this.http.post<IGameTeam>(this.resourceUrl, gameTeam, { observe: 'response' });
  }

  update(gameTeam: IGameTeam): Observable<EntityResponseType> {
    return this.http.put<IGameTeam>(this.resourceUrl, gameTeam, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGameTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGameTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
