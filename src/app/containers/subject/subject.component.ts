import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
   animations: [
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }), // Initial state
        animate('2000ms', style({ opacity: 1, transform: 'translateX(0)' })), // Final state
      ]),
    ]),
  ],
})
export class SubjectComponent {

  responsiveOptions: any[] | undefined;
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizName: String = '';

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }


 

  ngOnInit() {

      

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
      console.log(this.quizData);
      this.route.url.subscribe(segments => {
        console.log(segments);
        this.quizName = segments[1].toString();
        console.log(this.quizName);
      });
  }

  // getSeverity(status: string) {
  //     switch (status) {
  //         case 'INSTOCK':
  //             return 'success';
  //         case 'LOWSTOCK':
  //             return 'warning';
  //         case 'OUTOFSTOCK':
  //             return 'danger';
  //         default:
  //             return '';
  //     }
  // }

  // onChange($event) {
  //   if ($event.checked === true) {
  //     this.quizService.setChecked($event.checked);
  //   }
  // }

}
