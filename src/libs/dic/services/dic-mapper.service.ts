/*
 * Copyright (c) 2023-2024. IdrisovII & EustroSoft.org
 *
 * This file is part of eustrosoft-front project.
 * See the LICENSE file at the project root for licensing information.
 */

import { Injectable } from '@angular/core';
import { DicValue } from '../interfaces/dic-value.interface';
import { Option } from '@common-ui/interfaces/option.interface';

@Injectable({ providedIn: 'root' })
export class DicMapperService {
  toOption(value: DicValue): Option {
    return {
      value: value.code,
      displayText: value.value,
      disabled: false,
    };
  }
}
