import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';
import { TocService } from 'src/app/shared/toc.service';
import { BehaviorSubject, forkJoin, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizService } from 'src/app/shared/services/quiz.service';
// import { enviroment } from 'enviroment/enviroment';
import { AppConfig } from 'src/config/app.config';


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
  mcqQuestionAndOptionData = [];
  userRole = 'TE';
  // userId = 36;
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
  // url = enviroment.url;
  url:any;
  // url='<IMG src="http://3.109.178.249:8020/sasimages/';
  // imgae='<IMG src="/sasimages/'
  imgae4='/SASImages/'
  // imgae=enviroment.imgae;
  imgae:any;
  // imgae2='<IMG src=\"/SASImages/'
 
  // imgae2=enviroment.imgae2
  imgae2:any;
  // image3='<IMG src="/SASImages/'
  // image3=enviroment.image3
  image3:any;
  // image4='<IMG src="/SASImages/'
  // image4=enviroment.image4
  image4:any
  Templatecode:any
  // templatImage = `${enviroment.templatImage}/Assessments/QuestionBank/QuestionImage.ashx?`
  templatImage:any;
  // userId=enviroment.userId
  // userId =AppConfig.settings.data[0].userId;
  userId:any

  optionText1:any;
  optionText2:any;
  optionText3:any;
  optionText4:any;
  
  

  // getchapterTopicData : Observable<any>;

  constructor(private tocService: TocService, private quizService: QuizService) {

  }
  // quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));


  ngOnInit() {

    this.userId =AppConfig.settings.data[0].userId;

    this.imgae = AppConfig.settings.data[0].imgae;

    this.imgae2 = AppConfig.settings.data[0].imgae2;

    this.image3 =  AppConfig.settings.data[0].image3;
    this.image4 = AppConfig.settings.data[0].image4

    this.templatImage = `${AppConfig.settings.data[0].templatImage}/Assessments/QuestionBank/QuestionImage.ashx?`
    this.url = AppConfig.settings.data[0].url;




    

    this.quizService.getbookId.subscribe(resp => {
      this.bookId = resp;
      // console.log("bookid", this.bookId);

    })
    this.quizService.getclassId.subscribe(resp => {
      this.classId = resp;
      // console.log("classId", this.classId);

    })

    this.getchapterTopicData = this.tocService.getChapterTopicList(this.bookId, this.userId, this.userRole, this.viewMode, this.classId, this.section);

    // this.tocService.getChapterTopicList(this.bookId, this.userId, this.userRole, this.viewMode, this.classId, this.section).subscribe((resp) => {



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
    this.tocService.getChapterTopicCuratedList(CHAPTERID, TOPICID, this.userId, this.classId, this.section).subscribe((resp => {

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
        const observables = this.testId.map(id => this.tocService.getTestQuetion(id).toPromise());
        forkJoin(observables).subscribe(responses => {
          this.mcqQuestionAndOptionData = [].concat(...responses);
          console.log('Combined Data:', this.mcqQuestionAndOptionData);
          this.testData = false;
          if (this.testData == false) {
            console.log("check length", this.mcqQuestionAndOptionData.length)
            console.log("@@@",this.mcqQuestionAndOptionData);
    
    
            const numberOfLevel = 4;
    
            for (let i = 1; i <= numberOfLevel; i++) {
    
              this.quizId = `level${i}`
    
              for (let j = 0; j < this.mcqQuestionAndOptionData.length && j < 10; j++) {
    
                const jsonValue = this.mcqQuestionAndOptionData[this.couter];
                // console.log("jsonValue",jsonValue.Templatecode);
                // http://3.109.178.249:8020/Assessments/QuestionBank/QuestionImage.ashx?id=0000266900152807&templacecode=2
                this.couter++;
                //  let templateImage  = this.templatImage +'id='+ jsonValue.QId + '&templacecode='+ jsonValue.Templatecode
                let questionText= jsonValue.QText.replace(this.imgae,this.url).replace(this.imgae2,this.url).replace(this.image3,this.url).replace(this.image4,this.url).replace(this.imgae4,this.url)
                
                if(jsonValue.Templatecode=='2'){
                  let templateImage  = this.templatImage +'id='+ jsonValue.QId + '&templacecode='+ jsonValue.Templatecode
                  

                  questionText = questionText + '<br> <br> <div>  <img src = "'+templateImage+'" > </div>';
                
                }
                if(jsonValue.AnswerAText.length!=undefined){
                  this.optionText1= jsonValue.AnswerAText.replace(this.imgae,this.url).replace(this.imgae2,this.url);
                  console.log("this.optionText1",this.optionText1)


                }
               
                if(jsonValue.AnswerBText.length!=undefined){
                  this.optionText2= jsonValue.AnswerBText.replace(this.imgae,this.url).replace(this.imgae2,this.url);
                  console.log("this.optionText2",this.optionText2)


                }
                
                if(jsonValue.AnswerCText.length!=undefined){
                  console.log(jsonValue.AnswerCText)
                  this.optionText3= jsonValue.AnswerCText.replace(this.imgae,this.url).replace(this.imgae2,this.url);
                  console.log(" this.optionText3",this.optionText3)


                }
                

                if(jsonValue.AnswerDText.length!=undefined){
                  this.optionText4= jsonValue.AnswerDText.replace(this.imgae,this.url).replace(this.imgae2,this.url);
                  console.log(" this.optionText4",this.optionText4)


                }
                if(jsonValue.AnswerDText.length==undefined){
                  // this.optionText4= jsonValue.AnswerDText.replace(this.imgae,this.url).replace(this.imgae2,this.url);
                  // console.log(" this.optionText4",this.optionText4)
                  this.optionText4="saurabh4";
                  console.log(" this.optionText4",this.optionText4)

                }
                
                const correctAnswerIndex = parseInt(jsonValue.CorrectAnswerCode)-1;
               
                const question = {
                  questionText: questionText,
                  options: [
                    { text: this.optionText1,  correct: correctAnswerIndex === 0 },
                    { text: this.optionText2,  correct: correctAnswerIndex === 1  },
                    { text:this.optionText3,  correct: correctAnswerIndex === 2  },
                    { text: this.optionText4,  correct: correctAnswerIndex === 3  },
                  ],
                  explanation: `Correct Answer: ${jsonValue.CorrectAnswerCode}`
                };
    
                this.questions.push(question);
    
    
              };
            
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

        });
        

      };
     

      this.quizService.setMessage(this.transformDataSet);


    }));
  }



}



