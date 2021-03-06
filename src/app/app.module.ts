import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { KanbanComponent } from './main/kanban/kanban.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './main/login/login.component';
import { SettingsComponent } from './main/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemDetailComponent } from './main/kanban/item-box/item-detail/item-detail.component';

// Services
import { MainService } from './shared/main.service';
import { ModalService } from './shared/modal.service';

// Angular Materials
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';

// ng zorro
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';

// breadcrumb
import { BreadcrumbModule } from 'angular-crumbs';

//quill
import { QuillModule } from 'ngx-quill';
import { ItemBoxComponent } from './main/kanban/item-box/item-box.component';
import { ItemComponent } from './main/kanban/item-box/item/item.component';
import { CommentComponent } from './main/kanban/item-box/item/comment/comment.component';

registerLocaleData(en);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'project',
    component: MainComponent,
    data: { breadcrumb: 'Project' },
    children: [
      {
        path: 'kanban-board',
        data: { breadcrumb: 'Kanban Board' },
        component: KanbanComponent,
        children: [
          {
            path: 'issues',
            component: ItemBoxComponent,
            children: [
              {
                path: ':id',
                component: ItemComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'settings',
        data: { breadcrumb: 'Settings' },
        component: SettingsComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    KanbanComponent,
    SettingsComponent,
    NavbarComponent,
    LoginComponent,
    ItemBoxComponent,
    ItemComponent,
    CommentComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzBreadCrumbModule,
    BreadcrumbModule,
    NzAvatarModule,
    NzModalModule,
    NzIconModule,
    QuillModule,
    NzCommentModule,
    NzListModule,
    MatTooltipModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [MainService, ModalService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
