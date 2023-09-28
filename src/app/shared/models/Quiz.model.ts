import { QuizQuestion } from './QuizQuestion.model';

export interface Quiz {
  quizId: string;
  milestone: string;
  summary: string;
  imageUrl: string;
  imageUrl1: string;
  questions: QuizQuestion[];
  SNumber:Number;
  isEnable:Boolean;
  marks:Number;
  status: 'started' | 'continue' | 'completed' | '';
  // Templatecode:string;
}

