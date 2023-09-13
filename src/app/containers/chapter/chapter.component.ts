import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { TocService } from 'src/app/shared/toc.service';


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
  getchapterTopicData:any

  constructor(private tocService:TocService){

  }
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));



  ngOnInit(): void {

    this.tocService.getChapterTopicList().subscribe((resp)=>{

      

      this.getchapterTopicData = resp;
      console.log("data",this.getchapterTopicData);
      this.getchapterTopicData.forEach((element:any) => {
        console.log("that is",element.CHAPTERNAME)
        
      });

     
    })

    
  }

}
