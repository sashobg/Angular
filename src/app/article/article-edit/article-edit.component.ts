import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryList } from '../../core/models/category-list.model';
import { CategoriesService } from '../../core/services/category.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  id : string;
  bindingModel : Article;
  categories : Observable<CategoryList[]>

  constructor(
    private articleService : ArticleService,
    private route : ActivatedRoute,
    private router : Router,
    private toastr : ToastrService,
    private service: CategoriesService

  ) { }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
    this.id = this.route.snapshot.params['id'];
    this.articleService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
      })
  }

  edit() {
    const body = {
      [this.id] : this.bindingModel
    }
    
    this.articleService.editArticle(body)
      .subscribe((data) => {
        this.toastr.success('Article edited!', 'Success!');
        this.router.navigate(['/articles/list']);
      })
  }

}
