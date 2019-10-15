import { Component, OnInit, OnChanges, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-suggested-actions',
  templateUrl: './suggested-actions.component.html',
  styleUrls: ['./suggested-actions.component.scss']
})
export class SuggestedActionsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild("scrollbarContainer") scrollbarContainer: ElementRef;

  @Input() data;
  suggestions = [];
  scrollbar = null;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.suggestions = this.data.map( x => x['alertText'] )
  }

  ngAfterViewInit() {
    let container = this.scrollbarContainer.nativeElement;
    this.scrollbar = new PerfectScrollbar(container);
  }

  ngOnDestroy() {
    if (!!this.scrollbar) {
      this.scrollbar.destroy();
    }
  }

}
