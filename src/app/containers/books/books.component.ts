import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { TocService } from 'src/app/shared/toc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateY(-50px)' })),
      ]),
    ]),
  ],
})
export class BooksComponent {
  responsiveOptions: any[] | undefined;
  // quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizData:any;
  quizName: String = '';
 bookList:any;
 imagePathData:any;
 serverImage:any
 subjecId:any;
 classId:any;
 getChapterTopicCuratedList:any;
 defaultImageBook:string="../../../assets/images/samplebook.jpg";
 

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private tocService:TocService,
    private http:HttpClient
  ) { }


 

  ngOnInit() {
   
   this.quizService.getclassId.subscribe(resp=>{
    this.classId = resp;
    console.log("get classid",this.classId)
   })
    this.quizService.getSuibjectId.subscribe(resp=>{
      this.subjecId = resp;
      console.log("get SubjectId",this.subjecId)
      
    })

    this.bookList=this.tocService.getBookList(38,this.classId,this.subjecId);
   
   

      

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
      // console.log(this.quizData);
    //   this.quizData = [
    //     {
    //     imageUrl: "https://target.scene7.com/is/image/Target/GUEST_7aee5b9f-8d87-49dc-882a-a301b4b46903?qlt=65&fmt=pjpeg&hei=350&wid=350",
    //     quizId:"Histroy Agrwal"

    //   },
    //   {
    //     imageUrl: "https://m.media-amazon.com/images/I/91SbMgIsmLL.jpg",
    //     quizId:"Matmatics BM Sharma"

    //   },
    //   {
    //     imageUrl: 'https://www.bookgeeks.in/wp-content/uploads/2023/07/A-Few-Thousand-Kilometres-of-Happiness-by-Anand-Krishna-Panicker-Book.jpg',
    //     quizId: "Hindi Premchand"
    //   },
    //   {
    //     imageUrl: "https://www.bigw.com.au/medias/sys_master/images/images/h91/hf2/35092834615326.jpg",
    //     quizId:"English Arybhat"

    //   }
    // ]
      this.route.url.subscribe(segments => {
        console.log(segments);
        this.quizName = segments[1].toString();
        console.log(this.quizName);
      });
  }

  checkserverImageExist(serverImage:any){
    return this.http.get(`${serverImage}`, { observe: 'response', responseType: 'blob' })
    .pipe(
      map(resp=>{
        return{
          path: this.serverImage,
          status:200
        }
      }),
      catchError(()=>{
        return of (this.onImageError());
      })
    )
  }

  onImageError(){
    return{
      path:this.defaultImageBook,
      status:404
    }
  }
  onClick(bookid:any){
    console.log("bookId",bookid);
    this.quizService.setBookId(bookid)

    
  }

}
