import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { TocService } from 'src/app/shared/toc.service';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
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
  mcqQuestionAndOptionData: any;
  userRole = 'TE';
  userId = 30;
  viewMode = "curated";
  section = "A";
  bookId: any;
  classId: any;
  getChapterTopicCuratedList: any;
  testID:any;
  getchapterIdandTopicId:any;

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
  onCLick(CHAPTERID: any,TOPICID :any) {
    let obj = {
      chapterid: CHAPTERID,
      topicid: TOPICID

    }
    // console.log("123@TOPICID", obj);
    this.quizService.setTopicId(obj);
    this.tocService.getChapterTopicCuratedList( CHAPTERID,TOPICID,38 ,this.classId ,this.section).subscribe((resp => {

      // console.log("testing code ", resp);
      this.getChapterTopicCuratedList = resp;
    


      for (let i = 0; i < this.getChapterTopicCuratedList.length; i++) {
        if (this.getChapterTopicCuratedList[i].ElementType == "MCQ") {
          this.testID = this.getChapterTopicCuratedList[i].ID
          console.log("const testid", this.testID);
        }


      }
    }));

    // this.tocService.getTestQuetion().subscribe((resp) => {
    //   this.mcqQuestionAndOptionData = resp;
    //   console.log("this is ", resp);

     


    // });
    const getTestQuetiondata = this.tocService.getTestQuetion();
    console.log("@@@", getTestQuetiondata);



    // console.log("Data set");
    this.quizService.setMessage(this.transformDataSet)

    this.quizService.getMessage.subscribe(resp => {
      // console.log("get data of where set Data", resp)
    })

    this.quizService.setTestId(this.testID);

  }



}
