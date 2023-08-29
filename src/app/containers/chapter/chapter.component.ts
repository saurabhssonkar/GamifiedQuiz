import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/models/Quiz.model';
import { QUIZ_DATA } from 'src/app/shared/quiz';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit{
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));



  ngOnInit(): void {
    
  }

}
