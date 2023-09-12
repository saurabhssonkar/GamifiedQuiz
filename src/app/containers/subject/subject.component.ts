import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TocService } from 'src/app/shared/toc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';


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
  imageExists: boolean = false;
  remotePath: any;
  defaultImage:string="../../../assets/images/subjects/chemistry-green.svg"
  data:any
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private tocService: TocService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.tocService.getSubjectList(38, 5).subscribe((res) => {
      console.log("subjectList", res);
      this.Subject = res;
  
      this.Subject.map((_Subject:any) => {
        this.remotePath = "../../../assets/images/subjects/" + _Subject.Name.toLowerCase().replace(' ', '-') + "-green.svg";
       // Subject.ImagePath=this.defaultImage;
         _Subject.ImagePath="../../../assets/images/subjects/" + _Subject.Name.toLowerCase().replace(' ', '-') + "-green.svg";
        this.checkRemoteImageExists(this.remotePath).subscribe((result) => {
          this.data = result;
          _Subject.ImagePath=this.data.status=="404"?this.defaultImage: _Subject.ImagePath ;
          console.log("Subject", _Subject.Name);
          console.log("Original:", this.remotePath);
          console.log("Result:", result);
          console.log("Path",this.data.path);
          console.log("Status",this.data.status);
          console.log("Image", _Subject.ImagePath);
          // if(this.data.path && this.data.status == 200){
          //   this.defaultImage  = this.data.path;
          //   console.log("@1230",this.defaultImage)
          // }
          // else{
          //   // this.defaultImage = "../../../assets/images/subjects/chemistry-green.svg"
          // }

        });
       
      });
    }
    
    );

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
          console.log("subjectList", this.Subject);
  }
  
  checkRemoteImageExists(remotePath:string) {
    return this.http.get(`${remotePath}`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map(response => {
          return {
            path: this.remotePath,
            status: 200
          };
        }),
  
        catchError(() => {

          return of( this.onImageError()); 
        })
      
      );
  }
  onImageError(){

    return {
      path: this.defaultImage,
      status: 404
    };
    //return `123##%%${this.defaultImage}`

  }
  
  

}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Quiz } from 'src/app/shared/models/Quiz.model';
// import { QUIZ_DATA } from 'src/app/shared/quiz';
// import { QuizService } from 'src/app/shared/services/quiz.service';
// import { trigger, transition, style, animate } from '@angular/animations';
// import { TocService } from 'src/app/shared/toc.service';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map, of } from 'rxjs';

// @Component({
//   selector: 'app-subject',
//   templateUrl: './subject.component.html',
//   styleUrls: ['./subject.component.css'],
//   animations: [
//     trigger('fadeInOut', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('1500ms', style({ opacity: 1 })),
//       ]),
//       transition(':leave', [
//         animate('1500ms', style({ opacity: 0 })),
//       ]),
//     ]),
//   ],
// })
// export class SubjectComponent implements OnInit {
//   responsiveOptions: any[] | undefined;
//   quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
//   quizName: String = '';
//   Subject: any;
//   imageExists: boolean = false;
//   remotePath: any;
//   defaultImage: string = "../../../assets/images/subjects/chemistry-green.svg";
//   data: any;

//   constructor(
//     private quizService: QuizService,
//     private route: ActivatedRoute,
//     private tocService: TocService,
//     private http: HttpClient
//   ) {}

//   ngOnInit() {
//     this.tocService.getSubjectList(38, 5).subscribe((res) => {
//       console.log("subjectList", res);
//       this.Subject = res;

//       this.Subject.map((Name: any) => {
//         console.log("###", Name.Name);
//         this.remotePath =
//           "../../../assets/images/subjects/" +
//           Name.Name.toLowerCase().replace(' ', '-') +
//           "-green.svg";

//         this.checkRemoteImageExists().subscribe((result) => {
//           this.data = result;
//           console.log("Result:", result);
//           console.log("Path", this.data.path);
//           console.log("Status", this.data.status);
//         });
//       });
//     });

//     this.responsiveOptions = [
//       {
//         breakpoint: '1199px',
//         numVisible: 1,
//         numScroll: 1,
//       },
//       {
//         breakpoint: '991px',
//         numVisible: 2,
//         numScroll: 1,
//       },
//       {
//         breakpoint: '767px',
//         numVisible: 1,
//         numScroll: 1,
//       },
//     ];
//   }

//   checkRemoteImageExists() {
//     return this.http
//       .get(`${this.remotePath}`, { observe: 'response', responseType: 'blob' })
//       .pipe(
//         map((response) => {
//           return {
//             path: this.remotePath,
//             status: response.status,
//           };
//         }),
//         catchError(() => {
//           return of(this.onImageError());
//         })
//       );
//   }

//   onImageError() {
//     return this.defaultImage;
//   }
// }

