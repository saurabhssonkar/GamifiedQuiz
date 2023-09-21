import { ChangeDetectionStrategy, Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QUIZ_DATA } from '../../shared/quiz';
import { Quiz } from '../../shared/models/Quiz.model';
import { QuizService } from '../../shared/services/quiz.service';
import { Router } from '@angular/router';
import { TocService } from 'src/app/shared/toc.service';



@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionComponent implements OnInit {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizName: String = '';
  countdown:number=5;
  countInterval:any;
 QUIZ_DATA:any

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router:Router,
    private tocService:TocService
  ) { }

  ngOnInit(): void {
    console.log(this.quizData);
    this.route.url.subscribe(segments => {
      console.log(segments);
      this.quizName = segments[1].toString();
      console.log(this.quizName);
    });
    // this.startCountdown();

    this.quizService.getMessage.subscribe(resp=>{
      this.QUIZ_DATA =resp;
      console.log("get Data1")
      console.log("QUIZ_DATA",this.QUIZ_DATA);

    })
  }

  onChange($event) {
    if ($event.checked === true) {
      this.quizService.setChecked($event.checked);
    }
  }
  // startCountdown(){
    
  //   this.countInterval = setInterval(()=>{
  //     if(this.countdown>0){
  //       this.countdown--;
  //       console.log("timer",this.countdown);
  //       this.cdr.detectChanges();
  //     }
  //     else{
  //       clearInterval(this.countInterval);
  //       // [routerLink]="['/question/', quiz.quizId, 1]">
  //       // window.location.href=`/question/${this.quizName}/1`
  //       this.router.navigateByUrl(`/question/${this.quizName}/1`)
  //     }
  //   },1000);
  // }

 
}
