import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Article } from './models/article.model';
import { ArticleCreate } from './models/article-create.model';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl = 'https://ng-blog-64e70.firebaseio.com/articles/'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private http : HttpClient
  ) {  }

  getAllArticles() {
    return this.http.get(`${baseUrl}.json`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const articles : Article[] = [];
        for (const i of ids) {
          articles.push(new Article(i, res[i].name, 
            res[i].imagePath, res[i].description, res[i].body, res[i].author, res[i].createdOn, res[i].category));
        }

        return articles;
      }));
  }

  createArticle(body : ArticleCreate) {
    return this.http.post(`${baseUrl}.json`, body);
  }

  getById(articleId : string) {
    return this.http.get<Article>(`${baseUrl}${articleId}/.json`);
  }

  editArticle(body) {
    return this.http.patch(`${baseUrl}.json`, body);
  }

  deleteArticle(articleId : string) {
    return this.http.delete(`${baseUrl}${articleId}/.json`);
  }

  

  getArticlesFromCategory(category:string){
    return this.http.get(`${baseUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const articles: Article[] = [];
        for (const i of ids) {
          if(res[i].category === category)
          articles.push(new Article(i, res[i].name, 
            res[i].imagePath, res[i].description, res[i].body, res[i].author, res[i].createdOn, res[i].category));
        }
        return articles
      }));

  }
}