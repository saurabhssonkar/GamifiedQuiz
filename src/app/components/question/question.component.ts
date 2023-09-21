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
  selector: 'app-quiz',
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

    this.tocService.getTestQuetion().subscribe((resp) => {
      this.mcqQuestionAndOptionData = resp;
      console.log("this is ", resp);

        const numberOfLevel = 4;
        for (let i = 1; i <=numberOfLevel; i++) {

          this.quizId = `level${i}`

          for (let j = 0; j < this.mcqQuestionAndOptionData.length && j < 10; j++) {
            
            const jsonValue = this.mcqQuestionAndOptionData[this.couter];
            this.couter++;
            console.log("couter",this.couter);
            const question = {
              questionText: jsonValue.QText,
              options: [
                { text: jsonValue.AnswerAText, correct: "true" },
                { text: jsonValue.AnswerBText },
                { text: jsonValue.AnswerCText },
                { text: jsonValue.AnswerDText },
              ],
              explanation: `Correct Answer: ${jsonValue.CorrectAnswerCode}`
            };
      
            this.questions.push(question);
            console.log("@@@",this.questions)
         
          };
          this.quizId = this.quizId;
          // const SNumber=undefined
          // this.questions = this.jsonData;
          this.transformedData = {
            quizId:this.quizId,
            questions: [...this.questions],
            SNumber:1,
            isEnable:false,
            milestone:'TypeScript',
            summary:'TypeScript makes it easier to read and debug JavaScript code.',
            marks:0,
            imageUrl: '../../assets/images/1.jpg',
            imageUrl1: '../../assets/images/subject.png',
            
           
          };
          this.transformDataSet.push(this.transformedData)
          this.questions = [];
          console.log("transformData", this.transformDataSet)
        };
      

     


    });
    this.questionTest = this.tocService.getTestQuetion();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue !== changes.question.firstChange) {
      this.currentQuestion = changes.question.currentValue;
      this.correctAnswers = this.quizService.getCorrectAnswers(this.currentQuestion);
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
    this.quizStarted = true;
    this.correctMessage = this.quizService.correctMessage;
    this.isCorrectAnswerSelected = this.isCorrect(this.currentQuestion.options[optionIndex].correct, optionIndex);
    this.answer.emit(optionIndex);

    if (this.correctAnswers.length === 1) {
      this.currentQuestion.options.forEach((option: Option) => option.selected = false);
    }
    this.currentQuestion.options[optionIndex].selected = true;

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
}
