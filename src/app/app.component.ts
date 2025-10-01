/*
 * Copyright (c) 2023-2024. IdrisovII & EustroSoft.org
 *
 * This file is part of eustrosoft-front project.
 * See the LICENSE file at the project root for licensing information.
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { take, tap } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '@common-ui/components/header/header.component';
import { SidenavComponent } from '@common-ui/components/sidenav/sidenav.component';
import { LoginService } from '@security/services/login.service';
import { AuthenticationService } from '@security/services/authentication.service';
import { PRECONFIGURED_TRANSLATE_SERVICE } from '@core/di/preconfigured-translate-service.token';
import { APP_CONFIG } from '@config/di/config.token';
import { ExplorerRoutes } from '@explorer-lib/constants/enums/explorer-routes.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatSidenavModule,
    SidenavComponent,
    HeaderComponent,
    RouterOutlet,
    NgFor,
    MatMenuModule,
    AsyncPipe,
    TranslateModule,
  ],
  providers: [TranslateService],
})
export class AppComponent {
  private readonly loginService = inject(LoginService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  // PRECONFIGURED_TRANSLATE_SERVICE token must be injected. Otherwise, useFactory won't run
  private readonly translateService = inject(PRECONFIGURED_TRANSLATE_SERVICE);
  protected readonly config = inject(APP_CONFIG);
  protected isAuthenticated$ =
    this.authenticationService.isAuthenticated$.asObservable();

  logout(): void {
    this.loginService
      .logout()
      .pipe(
        tap(() => {
          this.router.navigate([ExplorerRoutes.Login]);
        }),
        take(1),
      )
      .subscribe();
  }
}
