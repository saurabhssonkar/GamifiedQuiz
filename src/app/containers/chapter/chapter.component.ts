import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { TocService } from 'src/app/shared/toc.service';
import { BehaviorSubject, forkJoin, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizService } from 'src/app/shared/services/quiz.service';


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
export class ChapterComponent implements OnInit {
  getchapterTopicData: any = undefined;
  transformedData: any
  transformDataSet = [];
  couter = 0;
  option = [];
  quizId: any
  questions = [];
  jsonData = [];
  questionTest: any;
  mcqQuestionAndOptionData: any[] = [];
  userRole = 'TE';
  userId = 36;
  viewMode = "curated";
  section = "A";
  bookId: any;
  classId: any;
  getChapterTopicCuratedList: any;
  testID: any;
  testId = [];
  getchapterIdandTopicId: any;
  getTestQuetiondata: any;
  testData: boolean = true;

  // getchapterTopicData : Observable<any>;

  constructor(private tocService: TocService, private quizService: QuizService) {

  }
  // quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));


  ngOnInit() {

    this.quizService.getbookId.subscribe(resp => {
      this.bookId = resp;
      // console.log("bookid", this.bookId);

    })
    this.quizService.getclassId.subscribe(resp => {
      this.classId = resp;
      // console.log("classId", this.classId);

    })

    this.getchapterTopicData = this.tocService.getChapterTopicList(this.bookId, this.userId, this.userRole, this.viewMode, this.classId, this.section);

    // this.tocService.getChapterTopicList().subscribe((resp) => {



    //   this.getchapterTopicData = resp;
    //   console.log("data", this.getchapterTopicData);
    //   this.getchapterTopicData.forEach((element: any) => {
    //     console.log("that is", element.CHAPTERNAME);

    //   });


    // })

    // this code is only for testing 






  }
  onCLick(CHAPTERID: any, TOPICID: any) {


    // this.quizService.setTopicId(obj);
    this.tocService.getChapterTopicCuratedList(CHAPTERID, TOPICID, 36, this.classId, this.section).subscribe((resp => {

      // console.log("testing code ", resp);
      this.getChapterTopicCuratedList = resp;
      console.log("this.getChapterTopicCuratedList", this.getChapterTopicCuratedList)

      for (let i = 0; i < this.getChapterTopicCuratedList.length; i++) {
        if (this.getChapterTopicCuratedList[i].ElementType == "MCQ") {
          this.testID = this.getChapterTopicCuratedList[i].ID
          this.testId.push(this.testID);

          console.log("const testid", this.testID);


        }
      }
      
      
      if (this.testData) {
        const observables = this.testId.map(id => this.tocService.getTestQuetion(id));
        forkJoin(observables).subscribe(responses => {
          this.mcqQuestionAndOptionData = [[].concat(...responses)];
          console.log('Combined Data:', this.mcqQuestionAndOptionData);


        });
        this.testData = false;

      };
      if (this.testData == false) {
        console.log("check length", this.mcqQuestionAndOptionData.length)


        const numberOfLevel = 4;

        for (let i = 1; i <= numberOfLevel; i++) {

          this.quizId = `level${i}`

          for (let j = 0; j < this.mcqQuestionAndOptionData.length && j < 10; j++) {

            const jsonValue = this.mcqQuestionAndOptionData[this.couter];
            this.couter++;
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


          };
          this.quizId = this.quizId;
          this.transformedData = {
            quizId: this.quizId,
            questions: [...this.questions],
            SNumber: 1,
            isEnable: false,
            milestone: 'TypeScript',
            summary: 'TypeScript makes it easier to read and debug JavaScript code.',
            marks: 0,
            imageUrl: '../../assets/images/1.jpg',
            imageUrl1: '../../assets/images/subject.png',


          };
          this.transformDataSet.push(this.transformedData)
          this.questions = [];
          console.log("transformData this data", this.transformDataSet)
        };

      }

      this.quizService.setMessage(this.transformDataSet);


    }));
  }



}



