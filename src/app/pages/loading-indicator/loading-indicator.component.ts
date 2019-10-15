import { Component, OnInit } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import { ContextManagerService } from './../../services/context-manager.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
  animations: [
    trigger(
      'leave', [
        transition(':leave', [
          style({opacity: 1}),
          animate('300ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class LoadingIndicatorComponent implements OnInit {

  indicator = {};

  constructor( public ContextManagerService: ContextManagerService ) { }

  ngOnInit() {}

}
