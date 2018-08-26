import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CategoryList } from '../models/category-list.model';
import { CategoryCreate } from '../models/category-create.model';


const baseUrl = 'https://ng-blog-64e70.firebaseio.com/categories/'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private http : HttpClient
  ) {  }

  getAllCategories() {
    return this.http.get(`${baseUrl}.json`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const categories : CategoryList[] = [];
        for (const i of ids) {
          categories.push(new CategoryList(res[i].name, i));
        }

        return categories;
      }));
  }

  createCategory(body : CategoryCreate) {
    return this.http.post(`${baseUrl}.json`, body);
  }

  getById(categoryId : string) {
    return this.http.get<CategoryList>(`${baseUrl}${categoryId}/.json`);
  }

  editCategory(body) {
    return this.http.patch(`${baseUrl}.json`, body);
  }

  deleteCategory(categoryId : string) {
    return this.http.delete(`${baseUrl}${categoryId}/.json`);
  }
}