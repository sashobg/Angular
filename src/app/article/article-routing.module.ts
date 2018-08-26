import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ArticleStartComponent } from './article-start/article-start.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleCategoriesComponent } from './article-categories/article-categories.component';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { AdminCategoriesComponent } from '../admin/admin-categories/admin-categories.component';

const routes : Route[] = [
  { path: '', pathMatch: 'full', component: ArticleStartComponent},
  { path: 'start', component: ArticleStartComponent},
  { path: 'create', component: ArticleCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'details/:id', component: ArticleDetailsComponent },
  { path: 'edit/:id', component: ArticleEditComponent, canActivate: [ AuthGuard ] },
  { path: 'list', component: ArticleListComponent },
  { path: 'category/:title', component: ArticleCategoryComponent },
  { path: 'categories', component: ArticleCategoriesComponent },
  { path: 'admin', component: AdminCategoriesComponent, canActivate: [ AuthGuard, AdminGuard]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ArticleRoutingModule {}