import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../core/services/category.service';
import { Observable } from 'rxjs';
import { CategoryList } from '../../core/models/category-list.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article : Article;
  id : string;
  categories : Observable<CategoryList[]>

  constructor(
    private articleService : ArticleService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router,
    private service: CategoriesService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.categories = this.service.getAllCategories()

    this.id = this.route.snapshot.params['id'];
    this.articleService.getById(this.id)
      .subscribe(data => {
        this.article = data;
      })
  }

  delete() {
    if (this.auth.isAdmin) 
    {    this.articleService.deleteArticle(this.id)
      .subscribe((data) => {
        this.toastr.success('Article deleted!', 'Success!');
        this.router.navigate(['/articles/list']);
      })
  }

else {
  this.toastr.error('You can not delete articles.', 'Error!');
  this.router.navigate(['/articles/list']);
}
  }
}
