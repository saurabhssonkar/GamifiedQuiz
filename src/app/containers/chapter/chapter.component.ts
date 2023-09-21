import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { TocService } from 'src/app/shared/toc.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(50px)' })),
      ]),
    ]),
  ],
})
export class ChapterComponent implements OnInit{
  getchapterTopicData:any=undefined;
  transformedData: any
  transformDataSet = [];
  couter=0;
  option=[];
  quizId:any
  questions=[];
  jsonData=[];
  questionTest: any;
  mcqQuestionAndOptionData: any;

  // getchapterTopicData : Observable<any>;

  constructor(private tocService:TocService){

  }
  // quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));


   ngOnInit() {

    this.getchapterTopicData=this.tocService.getChapterTopicList();

    // this.tocService.getChapterTopicList().subscribe((resp) => {


 
    //   this.getchapterTopicData = resp;
    //   console.log("data", this.getchapterTopicData);
    //   this.getchapterTopicData.forEach((element: any) => {
    //     console.log("that is", element.CHAPTERNAME);

    //   });


    // })

    this.tocService.getTestQuetion().subscribe((resp) => {
      this.mcqQuestionAndOptionData = resp;
      console.log("this is ", resp);

        const numberOfLevel = 4;
        for (let i = 1; i <=numberOfLevel; i++) {

          this.quizId = `level${i}`

          for (let j = 0; j < this.mcqQuestionAndOptionData.length && j < 10; j++) {
            
            const jsonValue = this.mcqQuestionAndOptionData[this.couter];
            this.couter++;
            // console.log("couter",this.couter);
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
            // console.log("@@@",this.questions)
         
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
    console.log("Data set");
    this.tocService.setMessage(this.transformDataSet)

    
  }

}
