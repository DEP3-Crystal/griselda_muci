import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trans } from 'src/app/model/Trans';

@Component({
  selector: 'app-trans',
  templateUrl: './trans.component.html',
  styleUrls: ['./trans.component.css']
})
export class TransComponent implements OnInit {


  @Input()
  info: Trans = new Trans() ;

  @Output()
  backToParent: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  sendInfoToParent() {
    this.backToParent.emit(this.info.amount !== null ? this.info.amount * 2 : 0)
  }

}
