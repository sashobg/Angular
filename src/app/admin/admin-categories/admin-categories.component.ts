import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryList } from '../../core/models/category-list.model';
import { CategoryCreate } from '../../core/models/category-create.model';
import { CategoriesService } from '../../core/services/category.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Observable<CategoryList[]>
  bindingModel: CategoryCreate
  deleteModel: CategoryList

  constructor(    private service: CategoriesService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,) { 
      this.bindingModel = new CategoryCreate("")
    }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
  }

  delete(id) {
    if (this.isAdmin) {
      this.service.deleteCategory(id)
        .subscribe((data) => {
          this.toastr.success('Category was deleted', 'Success!');
          this.router.navigate(['/articles/all']);
        })
      }
      else {
      this.toastr.error('You dont have permission to delete category.', 'Error!');
      this.router.navigate(['/articles/all']);
      }
    
  }

  create() {
    if (this.isAdmin) {
    this.service.createCategory(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Category was added', 'Success!');
        this.router.navigate(['/articles/all'])

      })
    }
    else {
      this.toastr.error('You dont have permission to add category.', 'Error!');
      this.router.navigate(['/articles/all']);
      }

  }

  private get isAdmin(): boolean {
    if (this.auth.isAdmin)
      return true
  }
}