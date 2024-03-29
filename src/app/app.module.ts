import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizRoutingModule } from './router/quiz-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { IntroductionComponent } from './containers/introduction/introduction.component';
import { QuizQuestionComponent } from './components/question/question.component';
import { QuizComponent } from './containers/quiz/quiz.component';
import { QuizSelectionComponent } from './containers/quiz-selection/quiz-selection.component';
import { ResultsComponent } from './containers/results/results.component';
import { ScoreboardComponent } from './containers/scoreboard/scoreboard.component';
import { ScoreComponent } from './containers/scoreboard/score/score.component';
import { TimeComponent } from './containers/scoreboard/time/time.component';
import { QuizService } from './shared/services/quiz.service';
import { TimerService } from './shared/services/timer.service';
import { JoinPipe } from './pipes/join.pipe';
import { SanitizeHtmlPipe } from './pipes/htmlsanitize.pipe';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from './containers/class/class.component';
import { ChapterComponent } from './containers/chapter/chapter.component';
import { SubjectComponent } from './containers/subject/subject.component';
import { CarouselModule } from 'primeng/carousel';
import { BooksComponent } from './containers/books/books.component';
import {HttpClientModule} from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { AppConfig } from 'src/config/app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    QuizQuestionComponent,
    QuizComponent,
    QuizSelectionComponent,
    ResultsComponent,
    ScoreboardComponent,
    ScoreComponent,
    TimeComponent,
    JoinPipe,
    SanitizeHtmlPipe,
    ClassComponent,
    ChapterComponent,
    SubjectComponent,
    BooksComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatMenuModule,
    MatToolbarModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    CarouselModule,
    HttpClientModule,
    
   
  ],
  exports: [MatExpansionModule],
  bootstrap: [AppComponent],
  providers: [QuizService, TimerService,NgxXml2jsonService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
     },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AppModule { }
