/*
 * Copyright (c) 2023-2024. IdrisovII & EustroSoft.org
 *
 * This file is part of eustrosoft-front project.
 * See the LICENSE file at the project root for licensing information.
 */

import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Dictionaries } from '../contants/enums/dictionaries.enum';
import {
  DicsResponse,
  DicValuesResponse,
} from '../interfaces/dic-response.interface';
import {
  DicRequest,
  DicValuesRequest,
} from '../interfaces/dic-request.interface';
import { DicRequestActions } from '../contants/enums/dic-actions.enum';
import { DicValue } from '../interfaces/dic-value.interface';
import { DispatchService } from '@core/services/dispatch.service';
import { QtisRequestResponse } from '@core/interfaces/qtis-req-res.interface';
import { Subsystems } from '@core/constants/enums/subsystems.enum';
import { SupportedLanguages } from '@core/constants/enums/supported-languages.enum';

@Injectable({ providedIn: 'root' })
export class DicService {
  private dispatchService = inject(DispatchService);

  getDictionaries(): Observable<QtisRequestResponse<DicsResponse>> {
    return this.dispatchService.dispatch<DicRequest, DicsResponse>({
      r: [
        {
          s: Subsystems.DIC,
          r: DicRequestActions.DICTIONARIES,
          l: SupportedLanguages.EN_US,
        },
      ],
      t: 0,
    });
  }

  getDicValues(
    dic: Dictionaries,
  ): Observable<QtisRequestResponse<DicValuesResponse>> {
    return this.dispatchService.dispatch<DicValuesRequest, DicValuesResponse>({
      r: [
        {
          s: Subsystems.DIC,
          r: DicRequestActions.VALUES,
          l: SupportedLanguages.EN_US,
          dic,
        },
      ],
      t: 0,
    });
  }

  getMappedDicValues<T>(
    dic: Dictionaries,
    mapFunc: (value: DicValue) => T,
  ): Observable<T[]> {
    return this.getDicValues(dic).pipe(
      map((response: QtisRequestResponse<DicValuesResponse>) =>
        response.r.flatMap((r: DicValuesResponse) => r.values).map(mapFunc),
      ),
    );
  }
}
