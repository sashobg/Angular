import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { CategoriesService } from '../../core/services/category.service';
import { CategoryList } from '../../core/models/category-list.model';

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.css']
})
export class ArticleCategoryComponent implements OnInit {

  category: string
  articles : Observable<Article[]>
  categories : Observable<CategoryList[]>


  constructor(
    private articlesService : ArticleService,
    private route: ActivatedRoute,
    private service: CategoriesService

  ) { }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
     this.category = this.route.snapshot.params['title'];
     this.articles = this.articlesService.getArticlesFromCategory(this.category);
  }

  

}