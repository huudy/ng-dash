import { Component, OnInit } from '@angular/core';
import { ContextManagerService } from '../../../services/context-manager.service';
import { BackendService } from '../../../services/backend.service';
import { SearchbarSettings } from './searchbar.settings';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';

// import * as FlexSearch from 'flexsearch';
// declare var $:any;
declare var autocomplete: any;

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(
    private ContextManagerService: ContextManagerService,
    private BackendService: BackendService,
    private UserService: UserService,
    private Router: Router
  ) { }

  ngOnInit() {
    if (this.UserService.getUserIsSet()) {
      this.initFlexSearchForPages();
      this.initFlexSearchForClients('user');
    } else {
      this.UserService.observeUserIsSet().subscribe(
        response => {
          if (response) {
            this.initFlexSearchForPages();
            this.initFlexSearchForClients('user');
          }
        }
      )
    }
    this.watchCoverageLevel();
  }

  initAutocomplete() {
    let self = this;

    if (!!this.autocomplete) {
      this.autocomplete.autocomplete.destroy();
    }

    this.autocomplete = autocomplete(
      '#searchbar',
      {
        autoselect: true,
        clearOnSelected: true,
        cache: false,
        hint: true
      }, [
        // CLIENTS
        {
          source: function (query, callback) {
            self.clientIndex.search(query).then(function (results) { callback(results.slice(0, 3)) });
          },
          name: 'clients',
          displayKey: 'clientName',
          templates: {
            header: '<h4>Clients</h4>',
            empty: '<div class="aa-suggestion">no clients found</div>',
            suggestion: function (suggestion, answer) {
              return '<div><em>' + suggestion.clientName + '</em><div class="small;">' + suggestion.clientId + ' - ' + suggestion.clientMatchCode + '</div></div>';
            }
          }
        },
        // PAGES
        {
          source: function (query, callback) {
            callback(self.pageIndex.search(query, 3));
          },
          name: 'pages',
          displayKey: 'name',
          templates: {
            header: '<h4>Pages</h4>',
            empty: '<div class="aa-suggestion">no pages found</div>',
            suggestion: function (suggestion, answer) {
              return '<div><em>' + suggestion.name + '</em><div class="small;">' + suggestion.tags + '</div></div>';
            }
          }
        }
      ]
    ).on('autocomplete:selected', function (event, suggestion, dataset) {
      let selectedSearchResult = {
        suggestion: suggestion,
        dataset: dataset
      };
      self.executeSearchFromSuggestion(selectedSearchResult, self.Router);
    });
  }

  executeSearchFromSuggestion(searchResult, Router) {
    if (searchResult.dataset == 'pages') {
      Router.navigateByUrl(searchResult.suggestion.routerLink);
    } else if (searchResult.dataset == 'clients') {
      Router.navigateByUrl('/index/client/' + searchResult.suggestion.clientId);
    }
  }

  clientIndex = null;
  pageIndex = null;
  clients = null;
  autocomplete = null;

  watchCoverageLevel() {

    let userIsSet$ = this.UserService.observeUserIsSet();
    let coverageLevel$ = this.ContextManagerService.observeCoverageLevel();

    combineLatest(userIsSet$, coverageLevel$, (userIsSet, coverageLevel) => ({ userIsSet, coverageLevel })).subscribe(
      response => {
        if (response.userIsSet) {
          this.initFlexSearchForClients(response.coverageLevel);
        }
      }
    );
  }

  initFlexSearchForPages() {
    this.pageIndex = new FlexSearch({
      doc: {
        id: 'id',
        field: ["name", "tags"]
      },
      preset: "match",
      limit: 3,
      async: false
      // async broken in 6.30
    });

    let self = this;

    let pages = SearchbarSettings.pageList.map((page, index) => { let newPage = { ...page }; newPage['id'] = index; return newPage; });

    // filter
    if (!this.UserService.getAdmin()) {
      pages = pages.filter(
        page => page.access.some(
          access => {
            return self.UserService.getGrants().includes(access);
          }
        )
      );
    }
    this.pageIndex.add(pages);
  }

  initFlexSearchForClients(hierarchyLevel: string) {
    this.BackendService.communicateWithBackend('data/clients', {}, { 'hierarchyLevel': hierarchyLevel, 'username': this.UserService.getExternalUsername() }).subscribe(
      response => {
        this.clients = response['clients'];
        this.clientIndex = new FlexSearch({
          doc: {
            id: 'id',
            field: ["clientId", "clientLEI", "clientMatchCodes", "clientName"]
          },
          preset: "match",
          limit: 3,
          async: true,
          workers: 4
          // async broken in 6.30
        });

        let conv = this.convertClientsForFlexsearch(this.clients)
        this.clientIndex.add(conv);
        this.initAutocomplete();
      }
    );
  }

  convertClientsForFlexsearch(array) {
    return array.map(
      (client, index) => {
        let newClient = { ...client };
        newClient['id'] = index;
        newClient['clientMatchCode'] = newClient['clientMatchCodes'].length > 1
          ? newClient['clientMatchCodes'][0] + ",..."
          : newClient['clientMatchCodes'][0] || "";
        newClient['clientMatchCodes'] = newClient['clientMatchCodes'].join();

        return newClient
      }
    )
  }

}
