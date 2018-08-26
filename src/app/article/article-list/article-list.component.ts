import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { CategoryList } from '../../core/models/category-list.model';
import { CategoriesService } from '../../core/services/category.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles : Observable<Article[]>
  categories : Observable<CategoryList[]>

  constructor(
    private articleService : ArticleService,
    private service: CategoriesService

  ) { }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
     this.articles = this.articleService
     .getAllArticles();
  }

}
