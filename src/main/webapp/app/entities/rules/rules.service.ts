import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRules } from 'app/shared/model/rules.model';

type EntityResponseType = HttpResponse<IRules>;
type EntityArrayResponseType = HttpResponse<IRules[]>;

@Injectable({ providedIn: 'root' })
export class RulesService {
  public resourceUrl = SERVER_API_URL + 'api/rules';

  constructor(protected http: HttpClient) {}

  create(rules: IRules): Observable<EntityResponseType> {
    return this.http.post<IRules>(this.resourceUrl, rules, { observe: 'response' });
  }

  update(rules: IRules): Observable<EntityResponseType> {
    return this.http.put<IRules>(this.resourceUrl, rules, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRules>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRules[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
