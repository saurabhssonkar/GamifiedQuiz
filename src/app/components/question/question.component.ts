import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuizQuestion } from '../../shared/models/QuizQuestion.model';
import { QuizService } from '../../shared/services/quiz.service';
import { TimerService } from '../../shared/services/timer.service';
import { Option } from 'src/app/shared/models/Option.model';
import { TocService } from 'src/app/shared/toc.service';


@Component({
  selector: 'codelab-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizQuestionComponent implements OnInit, OnChanges {
  currentQuestion: QuizQuestion;
  @Output() answer = new EventEmitter<number>();
  @Input() set question(value: QuizQuestion) { this.currentQuestion = value; }
  formGroup: FormGroup;
  quizStarted: boolean;
  multipleAnswer: boolean;
  alreadyAnswered = false;
  correctAnswers = [];
  correctMessage = '';
  isCorrectAnswerSelected = false;
  previousUserAnswersText = [];
  previousUserAnswersTextSingleAnswer = [];
  previousUserAnswersTextMultipleAnswer = [];
  questionTest: any;
  mcqQuestionAndOptionData: any;
  transformedData: any
  transformDataSet = [];
  couter=0;
  option=[];
  quizId:any
  questions=[];
  jsonData=[];
  isModalOpen = false;
  email = '';
  modalReturnValue = '';

  value:any;



  constructor(
    private quizService: QuizService,
    private timerService: TimerService, private frombuilder: FormBuilder,
    private tocService: TocService
  ) { }

  ngOnInit() {
    this.formGroup = this.frombuilder.group({
      answer: ['', Validators.required]
    });

    this.previousUserAnswersTextSingleAnswer = this.quizService.previousUserAnswersTextSingleAnswer;
    console.log("previousUserAnswersTextSingleAnswer", this.previousUserAnswersTextSingleAnswer)
    this.previousUserAnswersTextMultipleAnswer = this.quizService.previousUserAnswersTextMultipleAnswer;

   
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue !== changes.question.firstChange) {
      this.currentQuestion = changes.question.currentValue;
      console.log("this.currentQuestion",  this.currentQuestion)
      this.correctAnswers = this.quizService.getCorrectAnswers(this.currentQuestion);
      console.log("@@@ this.correctAnswers", this.correctAnswers)
      this.multipleAnswer = this.correctAnswers.length > 1;

      if (this.formGroup) {
        this.formGroup.patchValue({ answer: '' });
        this.alreadyAnswered = false;
      }
    }
  }


  isCorrect(correct: boolean, optionIndex: number): boolean {
    return correct === this.currentQuestion.options[optionIndex].correct;
  }

  setSelected(optionIndex: number): void {
    console.log("saurabh sonkar")
    this.quizStarted = true;
    this.correctMessage = this.quizService.correctMessage;
    console.log("this.correctMessage",this.correctMessage);
    this.isCorrectAnswerSelected = this.isCorrect(this.currentQuestion.options[optionIndex].correct, optionIndex);

    console.log(" this.isCorrectAnswerSelected ", this.isCorrectAnswerSelected )

    this.answer.emit(optionIndex);
    // console.log("this.answer.emit(optionIndex) ", this.answer.emit(optionIndex))

    if (this.correctAnswers.length === 1) {
      console.log("this.currentQuestion.options",this.currentQuestion.options)
      this.currentQuestion.options.forEach((option: Option) => option.selected = false);
      console.log("@@",this.currentQuestion.options.forEach((option: Option) => option.selected = false))
      this.value=0;
      console.log("this.value",this.value)
      
    }
    this.currentQuestion.options[optionIndex].selected = true;
    this.value=1;
    console.log("this.value",this.value);
    console.log("!!!!",    this.currentQuestion.options[optionIndex].selected = true)

    if (
      optionIndex >= 0 &&
      this.currentQuestion &&
      this.currentQuestion.options &&
      this.currentQuestion.options[optionIndex]['correct']
    ) {
      this.timerService.stopTimer();
      this.quizService.correctSound.play();
      optionIndex = null;
    } else {
      this.quizService.incorrectSound.play();
    }

    this.alreadyAnswered = true;
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.modalReturnValue = '';
  }
  onModalClose(){

  }
}
