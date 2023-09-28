import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TocService } from 'src/app/shared/toc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SubjectComponent {

  responsiveOptions: any[] | undefined;
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizName: String = '';
  Subject: any;
  remotePath: any;
  defaultImage:string="../../../assets/images/subjects/chemistry-green.svg"
  data:any
  Classid:any

  getClasslist:any;
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private tocService: TocService,
    private http: HttpClient
  ) { 
    
   }

  ngOnInit() {

    this.quizService.getclassId.subscribe(resp=>{
      this.Classid = resp;
      console.log("new Data",this.Classid);
    })
    
    this.Subject=this.tocService.getSubjectList(36, this.Classid);
    console.log("___@@@__",this.Subject);
    
    this.responsiveOptions = [
            {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
            },
            {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
            },
            {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
            }
          ];
        
  }
  onClick(subjectId:any){
    console.log("SubjectId",subjectId);
    this.quizService.setSubjectId(subjectId);
    

  }

}

