/*
 * Copyright (c) 2023-2024. IdrisovII & EustroSoft.org
 *
 * This file is part of eustrosoft-front project.
 * See the LICENSE file at the project root for licensing information.
 */

import { LoginActions } from '../constants/enums/login-actions.enum';
import { SupportedLanguages } from '@core/constants/enums/supported-languages.enum';
import { Subsystems } from '@core/constants/enums/subsystems.enum';

export interface PingRequest {
  s: Subsystems.PING;
  l: SupportedLanguages;
}

export interface LoginRequest {
  s: Subsystems.LOGIN;
  r: LoginActions.LOGIN;
  l: SupportedLanguages;
  login: string;
  password: string;
}

export interface LogoutRequest {
  s: Subsystems.LOGIN;
  r: LoginActions.LOGOUT;
  l: SupportedLanguages;
}
