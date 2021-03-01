import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasetControllerComponent } from '../components/dataset-controller/dataset-controller.component';
import { GeneralControllerComponent } from '../components/general-controller/general-controller.component';
import { ToolsControllerComponent } from '../components/tools-controller/tools-controller.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: GeneralControllerComponent },
  { path: 'general-controller', component: GeneralControllerComponent },
  { path: 'dataset-controller', component: DatasetControllerComponent },
  { path: 'tools-controller', component: ToolsControllerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
