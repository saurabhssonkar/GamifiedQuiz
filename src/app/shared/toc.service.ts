import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { NgxXml2jsonComponent, NgxXml2jsonService } from 'ngx-xml2json';
import { text } from '@fortawesome/fontawesome-svg-core';


@Injectable({
  providedIn: 'root'
})
export class TocService {
  getclasslist: any = null;
  classList:any;
  subjectList:any;
  getsubjectList:any;
  getChapterTopiclist:any

  constructor(private http: HttpClient ,private ngxXml2jsonService: NgxXml2jsonService) {}

  getclassList(id: number) {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetClassList xmlns="http://educomp.com/smartclass">
            <usrID>${id}</usrID>
          </GetClassList>
        </soap:Body>
      </soap:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      //  'Accept': ' appliction/json,text/xml, */*',
      // 'Accept-Encoding': 'gzip, deflate, br'
     //'responseType': 'text'
    });

    return this.http.post(`http://192.168.1.50:8081/services/Users/UserServices.asmx`, soapBody, {headers,responseType: 'text'})
      .pipe(
        map((resp: any) => {
          if(resp){
           const parse = new DOMParser();
           const xmlDoc=parse.parseFromString(resp,'text/xml');
           console.log('this',xmlDoc);
           const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
           this.getclasslist = obj;
           const ctsClassMasterArray = this.getclasslist['soap:Envelope']['soap:Body'].GetClassListResponse.GetClassListResult.CTSClassMaster;
           console.log('data',this.getclasslist);
            return ctsClassMasterArray;

          }
         
        }),
        catchError((error: any) => {
          console.log("Error Occurred", error);
          throw error; 
        })
      );

    
  };

  getSubjectList(id:Number ,id1:any){
    const soapBody = 
    `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetSubjects xmlns="http://educomp.com/smartclass">
                <usrID>${id}</usrID>
                <classID>${id1}</classID>
            </GetSubjects>
        </S:Body>
    </S:Envelope>`;
    const headers =  new HttpHeaders({
      'Content-Type': 'text/xml'
    });
    return this.http.post(`http://192.168.1.50:8081/services/Users/UserServices.asmx`,soapBody,{headers,responseType:'text'})
    .pipe(
      map((resp:any)=>{
        if(resp){
          const parse = new DOMParser();
          const xmlDoc = parse.parseFromString(resp ,'text/xml');
          const obj = this.ngxXml2jsonService.xmlToJson(xmlDoc);
          this.subjectList  =obj
          console.log("subjectLis",this.subjectList);
          const ctsSubjectList = this.subjectList['soap:Envelope']['soap:Body'].GetSubjectsResponse.GetSubjectsResult.CTSSubjectList;
          
          return ctsSubjectList;
        }
      }),
      catchError((error: any) => {
        console.log("Error Occurred", error);
        throw error; 
      })
    )
  };

  getBookList(userId:any, classId:any, subjectId:any){
    const soapBody=
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
    return this.http.post(`http://192.168.1.50:8081/services/Books/BookService.asmx`,soapBody,{headers,responseType:'text'})
    .pipe(
      map((resp:any)=>{
        if(resp){
          const parse = new DOMParser();
          const xmlDoc = parse.parseFromString(resp,'text/xml');
          const obj  =this.ngxXml2jsonService.xmlToJson(xmlDoc);
          this.getsubjectList=obj;
          const ctsBookList = this.getsubjectList['soap:Envelope']['soap:Body'].GetBooksResponse.GetBooksResult.CTSBookList;
          console.log("ctsBookList",ctsBookList);

          return ctsBookList;


        }

      }),
      catchError((error: any) => {
        console.log("Error Occurred", error);
        throw error; 
      })
    )
  }
  getChapterTopicList(){
    const soapBody=
    `<?xml version="1.0" ?>
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
        <S:Body>
            <GetTableOfContentsForCTS xmlns="http://educomp.com/smartclass">
                <book>100757</book>
                <usrID>30</usrID>
                <usrRole>TE</usrRole>
                <ViewMode>curated</ViewMode>
                <classID>5</classID>
                <section>A</section>
            </GetTableOfContentsForCTS>
        </S:Body>
    </S:Envelope>`;
    const headers = new HttpHeaders({
      'Content-Type':'text/xml'


    })
      
    

    return this.http.post(`http://192.168.1.50:8081/services/Books/BookService.asmx`,soapBody,({headers ,responseType:'text'}))
    .pipe(
      map((resp)=>{
        if(resp){
          const parse = new DOMParser();
          const xmlDoc = parse.parseFromString(resp,'text/html');
          const obj=this.ngxXml2jsonService.xmlToJson(xmlDoc);
          this.getChapterTopiclist = obj;
          console.log("###this.getChapterTopiclist",this.getChapterTopiclist);
          const ctsCapterTopicList  = this.getChapterTopiclist['HTML']['BODY']['SOAP:ENVELOPE']['SOAP:BODY'].GETTABLEOFCONTENTSFORCTSRESPONSE.GETTABLEOFCONTENTSFORCTSRESULT.BOOKCHAPTERLIST;
          return ctsCapterTopicList;




        }

      })
    )
  }
  
}
