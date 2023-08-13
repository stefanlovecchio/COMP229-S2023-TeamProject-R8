import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { TakeSurveyComponent } from './pages/take-survey/take-survey.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'list', component: ListComponent, data: {title: 'Survey List'}},
  {path: 'create', component: CreateComponent, data: {title: 'Create Survey'}},
  {path: 'edit', component: EditComponent, data: {title: 'Edit Survey'}},
  {path: 'take-survey', component: TakeSurveyComponent, data: {title: 'Take Survey'}},
  {path: 'results', component: ResultsComponent, data: {title: 'Results'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
