import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryList } from '../../core/models/category-list.model';
import { CategoriesService } from '../../core/services/category.service';


@Component({
  selector: 'app-news-categories',
  templateUrl: './article-categories.component.html',
  styleUrls: ['./article-categories.component.css']
})
export class ArticleCategoriesComponent implements OnInit {
  categories : Observable<CategoryList[]>
  constructor(
    private service: CategoriesService
      ) { }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
  }

}