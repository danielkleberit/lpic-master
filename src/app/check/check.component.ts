import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  Questions: any[] = [];
  currentIndex: number = 0;
  answer: any[] = [];
  correctAnswerZahl: number = 0;
  falseAnswerZahl: number = 0;
  filling: string = '';
  arrayfiling: string[] = [];
  multianswer: any[] = [];

  constructor(private service: QuizService,
    private daniel: Router,
    private shs: SharedService) { }

  ngOnInit(): void {
    this.currentIndex = 0;
    this.service.getQuestion().subscribe(data => { this.Questions = data; });

    this.shs.resetDaten();
  }


  leerfill(){
    this.filling='';
  }

  benutzerAnswer(antwort: string): void {
    this.answer = [];
    this.answer.push(antwort);
  }

  multikulti(option: string, event: any): void {

    console.log('multi answer:', this.multianswer)
    const mcaArray = this.multianswer;

    if (event.target.checked) {
      mcaArray.push(option);
    } else {
      const index = mcaArray.indexOf(option);
      if (index >= 0) {
        mcaArray.splice(index, 1);
      }
    }

    mcaArray.sort();
    this.multianswer = mcaArray;
    console.log(mcaArray)
  }


  choosemulti(option: string, event: any) {
    if (this.Questions[this.currentIndex].questionType === 'multiple-choice') {
      this.multikulti(option[0], event);
    }
    if (this.Questions[this.currentIndex].questionType === 'fill-in') {
this.fillin(event);
    }

  }

  fillin(event:any):void{
    this.answer=[];
    this.answer.push(event.target.value);
  }

  onNext(): void {
    const QuestionType = this.Questions[this.currentIndex].questionType;
    
    if (QuestionType === 'single-choice') {
      const userAnswer = this.answer[0];
      console.log('userAnswer', userAnswer);
      console.log('this.answer[0]', this.answer[0]);
      const currentQuestionanswer = this.Questions[this.currentIndex].correctAnswer[0];

      if (currentQuestionanswer === userAnswer[0]) {
        this.correctAnswerZahl++;
        console.log('singlechoose ist richtig und correct zahl ist', this.correctAnswerZahl);
        this.currentIndex++;
      } else {
        this.falseAnswerZahl++;
        console.log('antwort ist false der Zahl istt ', this.falseAnswerZahl)
      }
    }
    if (QuestionType === 'multiple-choice') {
      const usermultiAnswer = this.multianswer;
      const currentQuestionanswer = this.Questions[this.currentIndex].correctAnswer;

      console.log('usermultiAnswer:', usermultiAnswer);
      console.log('currentQuestionanswer:', currentQuestionanswer);

      if (Array.isArray(usermultiAnswer) && Array.isArray(currentQuestionanswer)) {

        if (JSON.stringify(usermultiAnswer) === JSON.stringify(currentQuestionanswer)) {
          this.correctAnswerZahl++;
          console.log('multichoose ist richtig und correct zahl ist', this.correctAnswerZahl);
          this.currentIndex++;
        } else {
          this.falseAnswerZahl++;
          console.log('antwort ist false der Zahl istt ', this.falseAnswerZahl);
        }
      } else {
        if (usermultiAnswer === currentQuestionanswer) {
          this.correctAnswerZahl++;
          console.log('multichoose ist richtig und correct zahl ist', this.correctAnswerZahl);
          this.currentIndex++;
        } else {
          this.falseAnswerZahl++;
          console.log('antwort ist false der Zahl istt ', this.falseAnswerZahl);
        }
      }
      this.multianswer = [];
    }
    if (QuestionType === 'fill-in') {
      
      const currentQuestionanswer = this.Questions[this.currentIndex].correctAnswer[0];
      if (this.answer[0] === currentQuestionanswer) {
        this.correctAnswerZahl++;
        this.currentIndex++;
        
      }
      else {
        this.falseAnswerZahl++
      }
        

      
  
      
    }
    
    if (this.falseAnswerZahl > 5) {
      this.daniel.navigateByUrl('/result');
    }
    this.shs.setCorrectAnswer(this.correctAnswerZahl);
    this.shs.getCorrectAnswer();
    this.shs.setfalseAnswer(this.falseAnswerZahl);
    this.shs.getFalseAnswer();
  }


  onSkipBack(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  dieErste(): void {
    this.currentIndex = 0;
  }

  dieLEtzte(): void {
    this.currentIndex = 119;
  }

  die20(): void {
    if (this.currentIndex + 19 < this.Questions.length - 1) {

      this.currentIndex += 20;
    }
  }

  diemin20(): void {
    if (this.currentIndex - 19 > 0) {

      this.currentIndex -= 20;
    }
  }

  onBack(): void {
    if (this.currentIndex > 0)
      this.currentIndex--;
  }
  onSkip(): void {
    if (this.currentIndex < this.Questions.length - 1) {
      this.currentIndex++;
    }
  }
}
