import { Component, OnInit } from '@angular/core';
import { ArticleCreate } from '../models/article-create.model';
import { ArticleService } from '../article.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { CategoryList } from '../../core/models/category-list.model';
import { CategoriesService } from '../../core/services/category.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  bindingModel : ArticleCreate;
  categories : Observable<CategoryList[]>


  constructor(
    private articleService : ArticleService,
    private toastr : ToastrService,
    private router : Router,
    private authService: AuthService,
    private service: CategoriesService
  ) {
    const author = this.authService.getUser()
    const date = new Date();
    this.bindingModel = new ArticleCreate("", "", "", "", author, date, "");
  }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
  }

  create() {
    this.articleService.createArticle(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Article created!', 'Success');
        this.router.navigate(['/articles/list']);
      })
  }

}
