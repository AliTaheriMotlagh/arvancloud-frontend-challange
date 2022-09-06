import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllArticlesComponent } from './article/all-articles/all-articles.component';
import { ArticleComponent } from './article/article/article.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
      {
        component: SidebarComponent,
        path: '',
        outlet: 'left',
      },
      {
        path: 'articles',
        component: AllArticlesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/page/:page',
        component: AllArticlesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/create',
        component: ArticleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/edit/:slug',
        component: ArticleComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
