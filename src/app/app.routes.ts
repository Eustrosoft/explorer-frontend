/*
 * Copyright (c) 2023-2024. IdrisovII & EustroSoft.org
 *
 * This file is part of eustrosoft-front project.
 * See the LICENSE file at the project root for licensing information.
 */

import { LoginPageComponent } from '@app/login-page/login-page.component';
import { Route } from '@angular/router';
import { ExplorerRoutes } from '@explorer-lib/constants/enums/explorer-routes.enum';
import { authenticationGuard } from '@security/guards/authentication.guard';
import { ExplorerComponent } from '@app/explorer/explorer.component';
import { PdfPreviewComponent } from '@app/explorer/components/pdf-preview/pdf-preview.component';
import { ImgPreviewComponent } from '@app/explorer/components/img-preview/img-preview.component';
import { TxtPreviewComponent } from '@app/explorer/components/txt-preview/txt-preview.component';

export const appRoutes: Route[] = [
  {
    path: ExplorerRoutes.Login,
    component: LoginPageComponent,
  },
  {
    path: '',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'TIS | Explorer',
        component: ExplorerComponent,
      },
      {
        path: ExplorerRoutes.PdfPreview,
        pathMatch: 'full',
        title: 'TIS | Explorer',
        component: PdfPreviewComponent,
      },
      {
        path: ExplorerRoutes.ImgPreview,
        pathMatch: 'full',
        title: 'TIS | Explorer',
        component: ImgPreviewComponent,
      },
      {
        path: ExplorerRoutes.TxtPreview,
        pathMatch: 'full',
        title: 'TIS | Explorer',
        component: TxtPreviewComponent,
      },
    ],
  },
];
