import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { NgxXml2jsonComponent, NgxXml2jsonService } from 'ngx-xml2json';
import { text } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Quiz } from './models/Quiz.model';
import { QUIZ_DATA } from './quiz';
import { enviroment } from '../enviroment/enviroment';



@Injectable({
  providedIn: 'root'
})
export class TocService {
  getclasslist: any = null;
  classList: any;
  subjectList: any;
  getsubjectList: any;
  getChapterTopiclist: any;
  getQuestionTest: any;
  ctsSubjectList: any
  remotePath: any;
  data: any;
  ctsBookList: any
  serverImage: any;;
  imagePathData: any;
  getChapterTopicCuratedlist: any;
  ctsClassMasterArray: any;
  GetChapterTopicCuratedListResponse: any;
  defaultImage: string = "../../../assets/images/subjects/chemistry-green.svg";

  defaultImageBook: string = "../../../assets/images/samplebook.jpg";
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
  loading:boolean=true;
  private hostName:any = enviroment.hostName;

  // private message = new BehaviorSubject<Quiz[]>(QUIZ_DATA);
  // getMessage = this.message.asObservable();


  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) { }

  getclassList(userId: number) {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetClassList xmlns="http://educomp.com/smartclass">
            <usrID>${userId}</usrID>
          </GetClassList>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      //  'Accept': ' appliction/json,text/xml, */*',
      // 'Accept-Encoding': 'gzip, deflate, br'
      //'responseType': 'text'
    });

    return this.http.post(`${this.hostName}/services/Users/UserServices.asmx`, soapBody, { headers, responseType: 'text' })
      .pipe(
        map((resp: any) => {
          if (resp) {
            const parse = new DOMParser();
            const xmlDoc = parse.parseFromString(resp, 'text/xml');
            console.log('this', xmlDoc);
            const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
            this.getclasslist = obj;
            this.ctsClassMasterArray = this.getclasslist['soap:Envelope']['soap:Body'].GetClassListResponse.GetClassListResult.CTSClassMaster;
            console.log('data', this.getclasslist);
            console.log('data2', this.ctsClassMasterArray);
            return this.ctsClassMasterArray;



          }

        }),
        catchError((error: any) => {
          console.log("Error Occurred", error);
          throw error;
        })
      );


  };


  getSubjectList(useId: Number, classId: any): Observable<any> {
    const soapBody =
      `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetSubjects xmlns="http://educomp.com/smartclass">
                <usrID>${useId}</usrID>
                <classID>${classId}</classID>
            </GetSubjects>
        </S:Body>
    </S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
    return this.http.post(`${this.hostName}/services/Users/UserServices.asmx`, soapBody, { headers, responseType: 'text' })
      .pipe(
        map((resp: any) => {
          if (resp) {
            const parse = new DOMParser();
            const xmlDoc = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
            this.subjectList = obj
            // console.log("subjectLis", this.subjectList);
            this.ctsSubjectList = this.subjectList['soap:Envelope']['soap:Body'].GetSubjectsResponse.GetSubjectsResult.CTSSubjectList;
            this.ctsSubjectList.map((_Subject: any) => {
              this.remotePath = "../../../assets/images/subjects/" + _Subject.Name.toLowerCase().replace(' ', '-') + "-green.svg";
              console.log(this.remotePath)
              _Subject.ImagePath = "../../../assets/images/subjects/" + _Subject.Name.toLowerCase().replace(' ', '-') + "-green.svg";
              this.checkRemoteImageExists(this.remotePath).subscribe((result) => {
                this.data = result;
                  _Subject.ImagePath = this.data.status == "404" ? this.defaultImage : _Subject.ImagePath;
                 
              
                // console.log("Subject", _Subject.Name);
                // console.log("Original:", this.remotePath);
                // console.log("Result:", result);
                // console.log("Path",this.data.path);
                // console.log("Status",this.data.status);
                // console.log("Image", _Subject.ImagePath);
                // console.log("Subject",this.ctsSubjectList);


              });

            });
           
             console.log(" this.ctsSubjectList", this.ctsSubjectList)

           
          }
         
            return this.ctsSubjectList;

          
        }),
        catchError((error: any) => {
          console.log("Error Occurred", error);
          throw error;
        })
      )
  };
  checkRemoteImageExists(remotePath: string) {
    return this.http.get(`${remotePath}`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map(response => {
          return {
            path: this.remotePath,
            status: 200
          };
        }),

        catchError(() => {

          return of(this.onImageError());
        })

      );
  }
  onImageError() {

    return {
      path: this.defaultImage,
      status: 404
    };

  }

  getBookList(userId: any, classId: any, subjectId: any) {
    const soapBody =
      `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetBooks xmlns="http://educomp.com/smartclass">
                <UserID>${userId}</UserID>
                <ClassID>${classId}</ClassID>
                <SubjectID>${subjectId}</SubjectID>
            </GetBooks>
        </S:Body>
    </S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      // 'Accept': '*/*',

    });
    return this.http.post(`${this.hostName}/services/Books/BookService.asmx`, soapBody, { headers, responseType: 'text' })
      .pipe(
        map((resp: any) => {
          if (resp) {
            const parse = new DOMParser();
            const xmlDoc = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
            this.getsubjectList = obj;
            this.ctsBookList = this.getsubjectList['soap:Envelope']['soap:Body'].GetBooksResponse.GetBooksResult.CTSBookList;
            console.log("ctsBookList", this.ctsBookList);
            console.log("ctsbooklength", this.ctsBookList.length);
            if (this.ctsBookList.length > 1) {
              this.ctsBookList.map((_BookId: any) => {
                this.serverImage = `${this.hostName}/Lessons/Images/hdimages/` + _BookId.BookID + ".jpg";
                _BookId.ImagePath = `${this.hostName}/Lessons/Images/hdimages/` + _BookId.BookID + ".jpg";

                this.checkserverImageExist(this.serverImage).subscribe((imagePaths: any) => {
                  this.imagePathData = imagePaths;

                  _BookId.ImagePath = this.imagePathData.status == "404" ? this.defaultImageBook : _BookId.ImagePath;


                });
              });

              return this.ctsBookList;

            }
            else {
              this.ctsBookList = [this.ctsBookList];
              console.log("_____@@@____", this.ctsBookList);
              this.ctsBookList.map((_BookId: any) => {
                this.serverImage = `${this.hostName}/Lessons/Images/hdimages/` + _BookId.BookID + ".jpg";
                _BookId.ImagePath = `${this.hostName}/Lessons/Images/hdimages/` + _BookId.BookID + ".jpg";

                this.checkserverImageExist(this.serverImage).subscribe((imagePaths: any) => {
                  this.imagePathData = imagePaths;

                  _BookId.ImagePath = this.imagePathData.status == "404" ? this.defaultImageBook : _BookId.ImagePath;


                });
              });

              return this.ctsBookList;


            }




          }

        }),
        catchError((error: any) => {
          console.log("Error Occurred", error);
          throw error;
        })
      )
  };
  checkserverImageExist(serverImage: any) {
    return this.http.get(`${serverImage}`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map(resp => {
          return {
            path: this.serverImage,
            status: 200
          }
        }),
        catchError(() => {
          return of(this.onImageErrorbook());
        })
      )
  }

  onImageErrorbook() {
    return {
      path: this.defaultImageBook,
      status: 404
    }
  }

  getChapterTopicList(bookId: any, userId: any, userRole: any, viewMode: any, classId: any, section: any): Observable<any> {
    const soapBody =
      `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetTableOfContentsForCTS xmlns="http://educomp.com/smartclass">
                <book>${bookId}</book>
                <usrID>${userId}</usrID>
                <usrRole>${userRole}</usrRole>
                <ViewMode>${viewMode}</ViewMode>
                <classID>${classId}</classID>
                <section>${section}</section>
            </GetTableOfContentsForCTS>
        </S:Body>
    </S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'


    })



    return this.http.post(`${this.hostName}/services/Books/BookService.asmx`, soapBody, ({ headers, responseType: 'text' }))
      .pipe(
        map((resp) => {
          if (resp) {
            const parse = new DOMParser();
            const xmlDoc = parse.parseFromString(resp, 'text/html');
            const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
            this.getChapterTopiclist = obj;
            console.log("###this.getChapterTopiclist", this.getChapterTopiclist);
            const ctsCapterTopicList = this.getChapterTopiclist['HTML']['BODY']['SOAP:ENVELOPE']['SOAP:BODY'].GETTABLEOFCONTENTSFORCTSRESPONSE.GETTABLEOFCONTENTSFORCTSRESULT.BOOKCHAPTERLIST;
            console.log("______))))))!!!", ctsCapterTopicList);
            return ctsCapterTopicList;




          }

        })
      )
  }

  getChapterTopicCuratedList(getchapterId: any, getchapterTopicId: any, userId: any, classId: any, Section: any): Observable<any> {

    const soapBody =
      `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Body>
        <GetChapterTopicCuratedList xmlns="http://educomp.com/smartclass">
            <chapterid>${getchapterId}</chapterid>
            <topicid>${getchapterTopicId}</topicid>
            <userid>${userId}</userid>
            <classsID>${classId}</classsID>
            <Section>${Section}</Section>
            <mappingType></mappingType>
        </GetChapterTopicCuratedList>
    </S:Body>
</S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'

    });
    return this.http.post(`${this.hostName}/services/Books/BookService.asmx`, soapBody, ({ headers, responseType: 'text' }))
      .pipe(
        map((resp) => {
          if (resp) {
            const parse = new DOMParser();
            const docxml = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(docxml);
            this.getChapterTopicCuratedlist = obj;
            this.GetChapterTopicCuratedListResponse = this.getChapterTopicCuratedlist['soap:Envelope']['soap:Body'].GetChapterTopicCuratedListResponse.GetChapterTopicCuratedListResult.CTSResourcesForCTS;
            // console.log("getChapterTopicCuratedList", this.GetChapterTopicCuratedListResponse);
            return this.GetChapterTopicCuratedListResponse

          }
        })
      )
  }

  getTestQuetion(testID:any) {

    const soapBody = `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetTestQuestions xmlns="http://educomp.com/smartclass/">
                <TestID>${testID}</TestID>
                <Type>Educomp</Type>
            </GetTestQuestions>
        </S:Body>ss
    </S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    })
    return this.http.post(`${this.hostName}/services/WebService_SAS.asmx`, soapBody, ({ headers, responseType: 'text' }))
      .pipe(
        map((resp) => {
          if (resp) {
            // console.log("resp",resp)
            const parse = new DOMParser();
            const docxml = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(docxml);
            this.getQuestionTest = obj;
            // console.log("getQuestionTest", this.getQuestionTest)

            const queSetDetails = this.getQuestionTest['soap:Envelope']['soap:Body'].GetTestQuestionsResponse.GetTestQuestionsResult.QSetDetails;
            this.mcqQuestionAndOptionData = queSetDetails
            
            
            return queSetDetails;
          }
        })
      )

  }

  // setMessage(message: Quiz[]) {
  //   this.message.next(message)
  // }

}

// const numberOfLevel = 4;
// for (let i = 1; i <= numberOfLevel; i++) {

//   this.quizId = `level${i}`

//   for (let j = 0; j < this.mcqQuestionAndOptionData.length && j < 10; j++) {

//     const jsonValue = this.mcqQuestionAndOptionData[this.couter];
//     this.couter++;
//     // console.log("couter",this.couter);
//     const question = {
//       questionText: jsonValue.QText,
//       options: [
//         { text: jsonValue.AnswerAText, correct: "true" },
//         { text: jsonValue.AnswerBText },
//         { text: jsonValue.AnswerCText },
//         { text: jsonValue.AnswerDText },
//       ],
//       explanation: `Correct Answer: ${jsonValue.CorrectAnswerCode}`
//     };

//     this.questions.push(question);
//     // console.log("@@@",this.questions)

//   };
//   this.quizId = this.quizId;
//   // const SNumber=undefined
//   // this.questions = this.jsonData;
//   this.transformedData = {
//     quizId: this.quizId,
//     questions: [...this.questions],
//     SNumber: 1,
//     isEnable: false,
//     milestone: 'TypeScript',
//     summary: 'TypeScript makes it easier to read and debug JavaScript code.',
//     marks: 0,
//     imageUrl: '../../assets/images/1.jpg',
//     imageUrl1: '../../assets/images/subject.png',


//   };
//   this.transformDataSet.push(this.transformedData)
//   this.questions = [];
//   console.log("transformData", this.transformDataSet)
// };
