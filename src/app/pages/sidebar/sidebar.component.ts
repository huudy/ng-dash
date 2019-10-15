import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { UserService } from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public widgets = [];

  @ViewChildren('sidebarWidgets') sidebar: QueryList<any>;

  // TODO: we may need a routing interceptor to change the appearance of the sidebar when navigation happens not through the buttons
  constructor(
    private BackendService: BackendService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    if (this.UserService.getUserIsSet()) {
      this.fetchWidgets();
    } else {
      this.UserService.observeUserIsSet().subscribe(
        response => {
          if (response) {
            this.fetchWidgets();
          }
        }
      )
    }
  }

  ngAfterViewInit() {
    // $('[data-toggle="tooltip"]').tooltip();
    this.sidebar.changes.subscribe(t => { $('.widget-icon[data-toggle="tooltip"]').tooltip(); })
    new PerfectScrollbar(document.querySelector('#sidebar'));
  }

  private fetchWidgets() {
    for (let grant of this.UserService.getGrants()) {
      this.BackendService.communicateWithBackend(
        'data/sidebar-ng', {}, { role: grant }
      ).subscribe(
        (response) => {
          let allItems = response['sidebar'];

          let sidebarWidgets = allItems.filter(item => !!item['elementIcon']);
          for (let widget of sidebarWidgets) {
            let widgetItems = allItems.filter(item => item['parentId'] == widget['elementId']);
            let items = [];

            // check of widget already exists and if yes fetch the existing children
            let index = this.widgets.map(w => w['icon']).indexOf(widget['elementIcon']);

            if (index >= 0) {
              items = this.widgets[index]['items'];
            }

            for (let item of widgetItems) {
              if (!(items.map(i => i['routerLink']).includes(item['elementRouterLink']))) {
                items.push(
                  { 'name': item['elementText'], 'routerLink': item['elementRouterLink'] }
                )
              }
            }
            if (index >= 0) {
              this.widgets[index]['items'] = items;
            } else {
              this.widgets.push(
                { 'icon': widget['elementIcon'], 'description': widget['elementDescription'], 'items': items, priority: widget['elementPriority'] }
              );
            }
            this.widgets.sort(function (a, b) { return a['priority'] - b['priority'] });
          }
        }
      )
    }
  }

  toggleSidebar($event) {

    let isExtended = ($('.sidebar-slider-extended').length > 0);

    // check if currently opened slider belongs to this widget
    let isOwn = ($(event.currentTarget).parent().children('.sidebar-slider')[0] == $('.sidebar-slider-extended')[0]);

    // remove decorators from all objects
    $('.sidebar-slider').removeClass('sidebar-slider-extended').removeClass('no-transition');
    $('#sidebar li').removeClass('selected');

    if (isOwn) {
      $('.active').addClass('selected');
      return;
    } else {
      $(event.currentTarget).parent().addClass('selected');
    }

    if (isExtended) {
      $(event.currentTarget).parent().children('.sidebar-slider').addClass('sidebar-slider-extended').addClass('no-transition');
    } else {
      $(event.currentTarget).parent().children('.sidebar-slider').addClass('sidebar-slider-extended');
    }

  }

  sidebarOpenClose() {
    let isExtended = ($('.sidebar-slider-extended').length > 0);
    if (isExtended) {
      $('.sidebar-slider').removeClass('sidebar-slider-extended').removeClass('no-transition');
      $('#sidebar li').removeClass('selected');
      $('.active').addClass('selected');
    } else {
      $('.active .sidebar-slider').addClass('sidebar-slider-extended');
    }
  }

}
