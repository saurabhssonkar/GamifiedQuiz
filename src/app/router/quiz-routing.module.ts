import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroductionComponent } from '../containers/introduction/introduction.component';
import { QuizComponent } from '../containers/quiz/quiz.component';
import { QuizSelectionComponent } from '../containers/quiz-selection/quiz-selection.component';
import { ResultsComponent } from '../containers/results/results.component';
import { ChapterComponent } from '../containers/chapter/chapter.component';
import { SubjectComponent } from '../containers/subject/subject.component';
import { BooksComponent } from '../containers/books/books.component';

const routes: Routes = [
  { path: '', redirectTo: 'select', pathMatch: 'full' },
  { path: 'select', component: QuizSelectionComponent, pathMatch: 'full' },
  { path: 'intro/:quizId', component: IntroductionComponent, pathMatch: 'full' },
  { path: 'question/:quizId/:questionIndex', component: QuizComponent, pathMatch: 'full' },
  { path: 'results/:quizId', component: ResultsComponent, pathMatch: 'full' },
  {path:'chapter',component: ChapterComponent},
  {path :'subject' ,component:SubjectComponent, pathMatch: 'full'},
  {path:'books',component:BooksComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
