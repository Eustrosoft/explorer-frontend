/*
 * Copyright (c) 2023-2024. IdrisovII & EustroSoft.org
 *
 * This file is part of eustrosoft-front project.
 * See the LICENSE file at the project root for licensing information.
 */

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { QtisRequestResponse } from '../interfaces/qtis-req-res.interface';
import { Config } from '@config/interfaces/config.interface';
import { APP_CONFIG } from '@config/di/config.token';

@Injectable({ providedIn: 'root' })
export class DispatchService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  dispatch<Req, Res>(
    body: QtisRequestResponse<Req>,
  ): Observable<QtisRequestResponse<Res>> {
    return this.config.pipe(
      switchMap((config: Config) =>
        this.http.post<QtisRequestResponse<Res>>(
          `${config.apiUrl}/dispatch`,
          body,
        ),
      ),
    );
  }
}
