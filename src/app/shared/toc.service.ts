import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { NgxXml2jsonComponent, NgxXml2jsonService } from 'ngx-xml2json';
import { text } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Quiz } from './models/Quiz.model';
import { QUIZ_DATA } from './quiz';



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
  GetChapterTopicCuratedListResponse:any;
  defaultImage: string = "../../../assets/images/subjects/chemistry-green.svg";

  defaultImageBook: string = "../../../assets/images/samplebook.jpg";


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

    return this.http.post(`http://192.168.1.50:8081/services/Users/UserServices.asmx`, soapBody, { headers, responseType: 'text' })
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


  getSubjectList(useId: Number, classId: any) {
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
    return this.http.post(`http://192.168.1.50:8081/services/Users/UserServices.asmx`, soapBody, { headers, responseType: 'text' })
      .pipe(
        map((resp: any) => {
          if (resp) {
            const parse = new DOMParser();
            const xmlDoc = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
            this.subjectList = obj
            console.log("subjectLis", this.subjectList);
            this.ctsSubjectList = this.subjectList['soap:Envelope']['soap:Body'].GetSubjectsResponse.GetSubjectsResult.CTSSubjectList;
            this.ctsSubjectList.map((_Subject: any) => {
              this.remotePath = "../../../assets/images/subjects/" + _Subject.Name.toLowerCase().replace(' ', '-') + "-green.svg";
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

            return this.ctsSubjectList;
          }
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
    return this.http.post(`http://192.168.1.50:8081/services/Books/BookService.asmx`, soapBody, { headers, responseType: 'text' })
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
                this.serverImage = "http://192.168.1.50:8081/Lessons/Images/hdimages/" + _BookId.BookID + ".jpg";
                _BookId.ImagePath = "http://192.168.1.50:8081/Lessons/Images/hdimages/" + _BookId.BookID + ".jpg";

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
                this.serverImage = "http://192.168.1.50:8081/Lessons/Images/hdimages/" + _BookId.BookID + ".jpg";
                _BookId.ImagePath = "http://192.168.1.50:8081/Lessons/Images/hdimages/" + _BookId.BookID + ".jpg";

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



    return this.http.post(`http://192.168.1.50:8081/services/Books/BookService.asmx`, soapBody, ({ headers, responseType: 'text' }))
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

  getChapterTopicCuratedList(): Observable<any> {

    const soapBody = 
    `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Body>
        <GetChapterTopicCuratedList xmlns="http://educomp.com/smartclass">
            <chapterid>133906</chapterid>
            <topicid>246152</topicid>
            <userid>38</userid>
            <classsID>3</classsID>
            <Section>A</Section>
            <mappingType></mappingType>
        </GetChapterTopicCuratedList>
    </S:Body>
</S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'

    });
    return this.http.post(`http://192.168.1.50:8081/services/Books/BookService.asmx`, soapBody, ({ headers, responseType: 'text' }))
      .pipe(
        map((resp) => {
          if (resp) {
            const parse = new DOMParser();
            const docxml = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(docxml);
            this.getChapterTopicCuratedlist = obj;
            this.GetChapterTopicCuratedListResponse = this.getChapterTopicCuratedlist['soap:Envelope']['soap:Body'].GetChapterTopicCuratedListResponse.GetChapterTopicCuratedListResult.CTSResourcesForCTS;
            console.log("getChapterTopicCuratedList", this.GetChapterTopicCuratedListResponse);
            return this.GetChapterTopicCuratedListResponse

          }
        })
      )
  }

  getTestQuetion(): Observable<any> {

    const soapBody = `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetTestQuestions xmlns="http://educomp.com/smartclass/">
                <TestID>0000266900006970</TestID>
                <Type>Educomp</Type>
            </GetTestQuestions>
        </S:Body>
    </S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    })
    return this.http.post(`http://192.168.1.50:8081/services/WebService_SAS.asmx`, soapBody, ({ headers, responseType: 'text' }))
      .pipe(
        map((resp) => {
          if (resp) {
            const parse = new DOMParser();
            const docxml = parse.parseFromString(resp, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(docxml);
            this.getQuestionTest = obj;
            console.log("getQuestionTest", this.getQuestionTest)

            const queSetDetails = this.getQuestionTest['soap:Envelope']['soap:Body'].GetTestQuestionsResponse.GetTestQuestionsResult.QSetDetails;
            return queSetDetails;
          }
        })
      )

  }

  // setMessage(message: Quiz[]) {
  //   this.message.next(message)
  // }

}
