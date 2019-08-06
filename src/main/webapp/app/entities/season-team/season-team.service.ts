import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISeasonTeam } from 'app/shared/model/season-team.model';

type EntityResponseType = HttpResponse<ISeasonTeam>;
type EntityArrayResponseType = HttpResponse<ISeasonTeam[]>;

@Injectable({ providedIn: 'root' })
export class SeasonTeamService {
  public resourceUrl = SERVER_API_URL + 'api/season-teams';

  constructor(protected http: HttpClient) {}

  create(seasonTeam: ISeasonTeam): Observable<EntityResponseType> {
    return this.http.post<ISeasonTeam>(this.resourceUrl, seasonTeam, { observe: 'response' });
  }

  update(seasonTeam: ISeasonTeam): Observable<EntityResponseType> {
    return this.http.put<ISeasonTeam>(this.resourceUrl, seasonTeam, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISeasonTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISeasonTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
