import { Component,ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  constructor(public shs: SharedService,
              private changeDetector:ChangeDetectorRef){};

              ngOnChanges(){
                this.changeDetector.detectChanges();
              }



}
