import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component'
import { AboutComponent } from './pages/about/about.component'
import { MenuComponent } from './pages/menu/menu.component'
import { CommentComponent } from './pages/comment/comment.component'

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'menu', component: MenuComponent},
  {path:'comment', component: CommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }