import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeamOwner } from 'app/shared/model/team-owner.model';

type EntityResponseType = HttpResponse<ITeamOwner>;
type EntityArrayResponseType = HttpResponse<ITeamOwner[]>;

@Injectable({ providedIn: 'root' })
export class TeamOwnerService {
  public resourceUrl = SERVER_API_URL + 'api/team-owners';

  constructor(protected http: HttpClient) {}

  create(teamOwner: ITeamOwner): Observable<EntityResponseType> {
    return this.http.post<ITeamOwner>(this.resourceUrl, teamOwner, { observe: 'response' });
  }

  update(teamOwner: ITeamOwner): Observable<EntityResponseType> {
    return this.http.put<ITeamOwner>(this.resourceUrl, teamOwner, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeamOwner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeamOwner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
