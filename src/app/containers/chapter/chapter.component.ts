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
  getchapterTopicData$ : Observable<any>;
  isdataloaded:boolean=false;

  constructor(private tocService:TocService){

  }
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));

  //getchapterTopicData=this.quizData;

   ngOnInit() {

    this.getchapterTopicData$=this.tocService.getChapterTopicList();

    this.tocService.getChapterTopicList().subscribe((resp) => {


      this.isdataloaded=true;
      this.getchapterTopicData = resp;
      console.log("data", this.getchapterTopicData);
      this.getchapterTopicData.forEach((element: any) => {
        console.log("that is", element.CHAPTERNAME);

      });


    })

    
  }

}
