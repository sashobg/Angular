import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { ArticleModule } from './article/article.module';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { HomeComponent } from './home/home.component';

const routes : Route[] = [
  {
    path: 'home', component: HomeComponent
  },
  { path: 'auth', children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
  ]  },
  { path: 'articles', 
   loadChildren: () => ArticleModule ,
   canActivate: [AuthGuard] 
  }, 
  { path: 'admin', 
   loadChildren: () => AdminCategoriesComponent ,
   canActivate: [AuthGuard] 
  },
  {
    path: '**', redirectTo: '/auth/signin'
  }
  
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }