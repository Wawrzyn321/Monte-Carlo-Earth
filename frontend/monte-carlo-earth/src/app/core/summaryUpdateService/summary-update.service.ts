import { Injectable, Output, EventEmitter } from '@angular/core';
import { Point } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class SummaryUpdateService {

  @Output() incrementEvent = new EventEmitter<Point>();

  constructor() { }

  emitIncrementEvent(point: Point): void {
    this.incrementEvent.emit(point);
  }
}
