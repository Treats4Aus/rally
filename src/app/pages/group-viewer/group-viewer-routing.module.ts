import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupViewerComponent } from './group-viewer.component';

const routes: Routes = [
  {
    path: ':id', 
    component: GroupViewerComponent 
  }, 
  {
    path: '**',
    redirectTo: '//home'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupViewerRoutingModule { }
