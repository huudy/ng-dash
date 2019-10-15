import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-userguide',
  templateUrl: './userguide.component.html',
  styleUrls: ['./userguide.component.scss']
})
export class UserguideComponent implements OnInit {

  constructor() { }

  // Workaround anchor link
  jumpToAnchor(id) {
    $('#userGuideModal').find('.modal-body').scrollTop(0)
    $('.modal-body').animate({ scrollTop: $(id).offset().top - 100 }, 650)
  }

  ngOnInit() {
  }

}
