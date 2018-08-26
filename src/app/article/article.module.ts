import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleStartComponent } from './article-start/article-start.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import { ArticleCategoriesComponent } from './article-categories/article-categories.component';
import { AdminCategoriesComponent } from '../admin/admin-categories/admin-categories.component';

@NgModule({
  declarations: [
    ArticleStartComponent,
    ArticleDetailsComponent,
    ArticleEditComponent,
    ArticleListComponent,
    ArticleCreateComponent,
    ArticleCategoriesComponent,
    ArticleCategoryComponent,
    AdminCategoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }