this is the home page code and comment this code in the quiz-selection.component.html 

<ng-container *ngIf="quizData.length > 0">
  <mat-card>
    <mat-card-header>
      <div class="container">
        <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 logo">
          <a [routerLink]="['/']">
            <div mat-card-avatar class="header-image"></div>
          </a>
        </div>
        <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <h1 i18n>Edumitram Quiz App</h1>
        </div>
        <!-- this is the comment line of the first if revert the code  -->
        <!-- <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 info">
          <a href="https://github.com/codelab-fun/codelab/blob/master/README.md#angular-codelab---codelabfun" target="_blank">
            <i class="material-icons">info</i>
          </a>
        </div> -->
      </div>
    </mat-card-header>

    <mat-card-content>
            <!-- 
      <mat-toolbar>
        <button mat-button [matMenuTriggerFor]="menu"><span i18n>Milestones &#x25BC;</span></button>
        <mat-menu #menu="matMenu">
          <div *ngFor="let quiz of quizData">
            <button mat-menu-item
                    [routerLink]="['/quiz/intro/', quiz?.quizId]"
                    data-i18n="quiz.milestone">{{ quiz?.milestone }}</button>
          </div>
        </mat-menu>
      </mat-toolbar> -->

      <mat-grid-list cols="3" rowHeight="370px">
        <mat-grid-tile *ngFor="let quiz of quizData" [routerLink]="['/subject']">
          <!-- [ngClass]="{ 'started': status === 'started' && quiz?.quizId === startedQuizId,
                       'continue': status === 'continue' && quiz?.quizId === continueQuizId,
                       'completed': status === 'completed' && quiz?.quizId === completedQuizId }"
          [ngStyle]="{ 'background': 'url(' + quiz?.imageUrl + ') no-repeat center 10px',
                       'background-size': '300px 210px' }"> -->
          <!-- starting mcq page below the summary jus top of the start quiz -->
          <summary class="quiz-info">
            <h5 class="quiz-title" i18n>{{ quiz?.milestone }}</h5>
            <h6 class="quiz-subtitle text-justify" i18n>{{ quiz?.summary }}</h6>
          </summary>
          <!-- content of the mcq option  -->
          <div class="status-icon">
            <!-- <span class="icon" matTooltip="Start"
                  *ngIf="!quizCompleted || status === 'started' || quiz?.quizId === startedQuizId"
                  [routerLink]="['/intro/', quiz?.quizId]">
              <svg viewBox="0 0 24 24">
                <path [attr.d]="quizStatusIcon.start" />
              </svg>
            </span> -->
            <!-- <span class="icon" matTooltip="Continue" 
                  *ngIf="status === 'continue' || quiz?.quizId === continueQuizId"
                  [routerLink]="['/question/', quiz?.quizId, currentQuestionIndex]">
              <svg viewBox="0 0 24 24">
                <path [attr.d]="quizStatusIcon.continue" />
              </svg>
            </span> -->
            <!-- <span class="icon" matTooltip="Completed"
                  *ngIf="status === 'completed' && quiz?.quizId === completedQuizId"
                  [routerLink]="['/results/', quiz?.quizId]">
              <svg viewBox="0 0 24 24">
                <path [attr.d]="quizStatusIcon.completed" />
              </svg>
            </span> -->
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </mat-card-content>

    <mat-card-footer>
      <h3 class="text-center" i18n>Copyright &copy; 2023 Edumitram.fun</h3>
    </mat-card-footer>
  </mat-card>
</ng-container>


this is the old cod of the mcq  


<ng-container *ngFor="let quiz of quizData">
  <mat-card
    [@changeRoute]="animationState$ | async"
    (@changeRoute.done)="animationDoneHandler()"
    *ngIf="quiz.quizId === quizName && question && questionIndex <= totalQuestions">

    <mat-card-header>
      <!-- mcq header image -->
      <div mat-card-avatar class="header-image"
           [routerLink]="['/select']"
           matTooltip="back to Codelab Quiz Selection" matTooltipPosition="left">
      </div>
      <!-- mcq title text  -->
      <mat-card-title i18n>{{ quiz?.milestone }} Quiz</mat-card-title>
      <mat-card-subtitle i18n>Assess your knowledge of {{ quiz?.milestone }}</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <!-- this is the timer box and score box -->
      <codelab-scoreboard></codelab-scoreboard>

    <!-- mcq text box question  -->
      <section id="question" class="css-typing" [ngClass]="!answers || answers.length === 0 ? 'unanswered': 'answered'">
        <span *ngIf="!answers || answers.length === 0" i18n>{{ question?.questionText }}&nbsp;
          <span class="number-correct" *ngIf="numberOfCorrectAnswers > 1">
            <em>({{ numberOfCorrectAnswers }} answers are correct.)</em>
          </span>
        </span>
        <span *ngIf="answers && answers.length > 0" i18n>
          {{ numberOfCorrectAnswers === 1 ? 'Option ' + correctOptions + ' was correct because ' :
          'Options ' + correctOptions + ' were correct because ' }}
          {{ explanationText }}.
        </span>
      </section>

      <codelab-quiz-question
        [question]="question"
        (answer)="selectedAnswer($event)">
      </codelab-quiz-question>
    </mat-card-content>

<mat-card-footer>
      <section class="paging">
        <mat-card-actions>
          <mat-nav-list>
            <!-- left arrow or previous arrow  -->
             <div class="prev-question-nav" *ngIf="question && questionIndex > 1">
              <button type="button" mat-flat-button
                      (click)="advanceToPreviousQuestion()"
                      (window:keydown.ArrowLeft)="advanceToPreviousQuestion()"
                      matTooltip="&laquo; Previous Question" matTooltipPosition="above">
                <svg viewBox="0 0 410.258 410.258">
                  <polygon [attr.points]="paging.previousButtonPoints"/>
                </svg>
              </button>
            </div> 
            <!-- restrat button or restart arrow -->
            
            <div class="restart-nav" *ngIf="question && questionIndex > 1 && questionIndex < totalQuestions">
              <button type="button" mat-flat-button (click)="restartQuiz()"
                      matTooltip="Restart Quiz" matTooltipPosition="above">
                <svg viewBox="0 0 305.836 305.836">
                  <path [attr.d]="paging.restartButtonPath"/>
                </svg>
              </button>
            </div> 

            <!-- right arrow or next arrow  -->
             <div class="next-question-nav" *ngIf="question && questionIndex !== totalQuestions">
              <button type="button" mat-flat-button
                      (click)="advanceToNextQuestion()"
                      (window:keydown.ArrowRight)="advanceToNextQuestion()"
                      (window:keydown.Enter)="advanceToNextQuestion()"
                      matTooltip="Next Question &raquo;" matTooltipPosition="above" [disabled]="!isAnswered">
                <svg viewBox="0 0 410.258 410.258">
                  <polygon [attr.points]="paging.nextButtonPoints"/>
                </svg>
              </button>
            </div> 
             <!-- show your score button  -->
            <div class="show-score-nav" *ngIf="question && questionIndex === totalQuestions">
              <button type="submit" mat-raised-button disableRipple="true"
                      (click)="advanceToResults()"
                      (window:keydown.Enter)="advanceToResults()"
                      (window:keydown.ArrowRight)="advanceToResults()"
                      class="btn btn-outline-primary">
                <strong>Show Your Score</strong>
              </button>
            </div>
          </mat-nav-list>
        </mat-card-actions>
      </section>

      <section class="progress-bar" *ngIf="question && questionIndex > 1">
        <ngb-progressbar
          max="100"
          type="success"
          [striped]="true"
          [animated]="true"
          [value]="progressValue"
          class="progress-bar bg-info">
            <strong>{{ progressValue.toFixed(0) }}%</strong>
        </ngb-progressbar>
      </section>
    </mat-card-footer>
  </mat-card>
</ng-container>