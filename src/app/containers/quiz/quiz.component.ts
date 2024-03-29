import { ChangeDetectionStrategy, Component, Input, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { QUIZ_DATA } from '../../shared/quiz';
import { Option } from '../../shared/models/Option.model';
import { Quiz } from '../../shared/models/Quiz.model';
import { QuizQuestion } from '../../shared/models/QuizQuestion.model';
// import { Resource } from '../../shared/models/Resource.model';
// import { QuizResource } from '../../shared/models/QuizResource.model';
import { QuizService } from '../../shared/services/quiz.service';
import { TimerService } from '../../shared/services/timer.service';
import { Animations } from '../../animations/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


type AnimationState = 'animationStarted' | 'none';

@Component({
  selector: 'codelab-quiz-component',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [Animations.changeRoute],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
  // @Input() justName:any
  // quizData: Quiz[] = QUIZ_DATA;
  quizData:any;
  quizName = '';
  // quizResources: QuizResource[] = JSON.parse(JSON.stringify(QUIZ_RESOURCES));
  question: QuizQuestion;
  questions: QuizQuestion[];
  // resources: Resource[];
  answers: number[] = [];
  questionIndex: number;
  totalQuestions: number;
  totalQuestionsAttempted: number;
  progressValue: number;
  correctCount: number;
  quizId: string;
  indexOfQuizId: number;
  status: string;
  animationState$ = new BehaviorSubject<AnimationState>('none');
  get explanationText(): string { return this.quizService.explanationText; }
  get correctOptions(): string { return this.quizService.correctOptions; }
  get numberOfCorrectAnswers(): number { return this.quizService.numberOfCorrectAnswers; }
  previousUserAnswers: any;
  isAnswered:boolean;
  

  paging = {
    previousButtonPoints: "298.052,24 266.052,0 112.206,205.129 266.052,410.258 298.052,386.258 162.206,205.129 ",
    nextButtonPoints: "144.206,0 112.206,24 248.052,205.129 112.206,386.258 144.206,410.258 298.052,205.129 ",
    restartButtonPath: "M152.924,300.748c84.319,0,152.912-68.6,152.912-152.918c0-39.476-15.312-77.231-42.346-105.564 c0,0,3.938-8.857,8.814-19.783c4.864-10.926-2.138-18.636-15.648-17.228l-79.125,8.289c-13.511,1.411-17.999,11.467-10.021,22.461 l46.741,64.393c7.986,10.992,17.834,12.31,22.008,2.937l7.56-16.964c12.172,18.012,18.976,39.329,18.976,61.459 c0,60.594-49.288,109.875-109.87,109.875c-60.591,0-109.882-49.287-109.882-109.875c0-19.086,4.96-37.878,14.357-54.337 c5.891-10.325,2.3-23.467-8.025-29.357c-10.328-5.896-23.464-2.3-29.36,8.031C6.923,95.107,0,121.27,0,147.829 C0,232.148,68.602,300.748,152.924,300.748z"
  };

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.quizService.getMessage.subscribe(resp=>{
      this.quizData  = resp;
      console.log("quiz.componet.ts",this.quizData);

    })
    this.quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    console.log(this.quizId)
    this.indexOfQuizId = this.quizData.findIndex(el => el.quizId === this.quizId); 
    
    this.sendPreviousUserAnswersToQuizService(this.quizService.previousUserAnswers);
    console.log("this quizData",this.quizData);

    
  }

  ngOnInit() {
    this.getQuizNameFromRoute();
    this.shuffleQuestionsAndAnswers();

    this.activatedRoute.params.subscribe(params => {
      this.totalQuestions = this.quizData[this.indexOfQuizId].questions.length;
      this.quizService.setTotalQuestions(this.totalQuestions);

      if (params.questionIndex) {
        this.questionIndex = parseInt(params.questionIndex, 0);
        this.quizService.currentQuestionIndex = this.questionIndex;

        if (this.questionIndex === 1) {
          this.progressValue = 0;
          this.quizData[this.indexOfQuizId].status = 'started';
        } else {
          this.progressValue = ((this.questionIndex - 1) / this.totalQuestions) * 100;
        }

        this.sendQuestionToQuizService();
        this.sendQuestionsToQuizService();
        this.sendQuizIdToQuizService();
        this.sendQuizStatusToQuizService();
        this.sendTotalQuestionsAttemptedToQuizService();
        this.sendPreviousUserAnswersToQuizService(this.quizService.previousUserAnswers);
        // this.sendResourcesToQuizService();
      }
    });

    if (this.questionIndex === 1) {
      this.quizService.correctAnswersCountSubject.next(0);
    }

    this.correctCount = this.quizService.correctAnswersCountSubject.getValue();
    this.sendCorrectCountToQuizService(this.correctCount);
    this.totalQuestionsAttempted = 1;

    

  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }

  selectedAnswer(data) {
    this.isAnswered=true;
    const correctAnswers = this.question.options.filter((options) => options.correct);
    if (correctAnswers.length > 1 && this.answers.indexOf(data) === -1) {
      this.answers.push(data);
    } else {
      this.answers[0] = data;
    }
  }

  checkIfAnsweredCorrectly() {
    if (this.question) {
      const correctAnswerFound = this.answers.find((answer) => {
        return this.question.options &&
          this.question.options[answer] &&
          this.question.options[answer]['selected'] &&
          this.question.options[answer]['correct'];
      });

      const answers = this.answers && this.answers.length > 0 ? this.answers.map((answer) => answer + 1) : [];
      this.quizService.userAnswers.push(this.answers && this.answers.length > 0 ? answers : this.answers);

      if (correctAnswerFound > -1 && answers.length === this.quizService.numberOfCorrectAnswers) {
        this.sendCorrectCountToQuizService(this.correctCount + 1);
        this.totalQuestionsAttempted++;
      }
    }
  }

  shuffleQuestionsAndAnswers(): void {
    if (this.quizService.checkedShuffle) {
      this.quizService.shuffledQuestions(this.quizData[this.indexOfQuizId].questions);
      this.quizService.shuffledAnswers(this.quizData[this.indexOfQuizId].questions[this.quizService.currentQuestionIndex].options);
    }
  }

  getQuizNameFromRoute(): void {
    this.activatedRoute.url.subscribe(segments => {
      this.quizName = segments[1].toString();
    });
  }

  private sendQuestionsToQuizService() {
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setQuestions(this.questions);
  }

  private sendQuestionToQuizService() {
    this.question = this.quizData[this.indexOfQuizId].questions[this.questionIndex - 1];
    this.quizService.setQuestion(this.question);
  }

  private sendQuizIdToQuizService() {
    this.quizService.setQuizId(this.quizId);
  }

  private sendQuizStatusToQuizService(): void {
    this.status = this.quizData[this.indexOfQuizId].status;
    this.quizService.setQuizStatus(this.status);
  }

  private sendTotalQuestionsAttemptedToQuizService(): void {
    this.quizService.setTotalQuestionsAttempted(this.totalQuestionsAttempted);
  }

  private sendPreviousUserAnswersToQuizService(previousAnswers): void {
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setPreviousUserAnswersText(previousAnswers, this.questions);
  }

  /* private sendResourcesToQuizService() {
    this.resources = this.quizResources[this.indexOfQuizId].resources;
    this.quizService.setResources(this.resources);
  } */


  /* navigation/paging functions */
  advanceToNextQuestion() {
    this.isAnswered=false;
    this.checkIfAnsweredCorrectly();
   // this.answers = [];
    this.quizData[this.indexOfQuizId].status = 'continue';
    this.animationState$.next('animationStarted');
    this.quizService.navigateToNextQuestion();
  }

  advanceToPreviousQuestion() {
    this.isAnswered=true;
   // this.answers = [];
    this.quizData[this.indexOfQuizId].status = 'continue';
    this.animationState$.next('animationStarted');
    this.quizService.navigateToPreviousQuestion();
  }

  advanceToResults() {
    this.quizService.resetAll();
    this.checkIfAnsweredCorrectly();
    this.quizService.navigateToResults();
  }

  restartQuiz() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.answers = null;
    this.router.navigate(['/question/', this.quizId, 1]).then();
  }

  sendCorrectCountToQuizService(value: number): void {
    this.correctCount = value;
    this.quizService.sendCorrectCountToResults(this.correctCount);
  }
  toHTML(input) : any {
    console.log("data",input)
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}
transform(input: string): string {
  console.log("data", input);
  const parsedHTML = new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  return parsedHTML;
}

}