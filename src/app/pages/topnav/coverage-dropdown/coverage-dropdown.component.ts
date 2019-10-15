import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { ContextManagerService } from '../../../services/context-manager.service';
import { UserService } from '../../../services/user.service';

declare var $: any;


@Component({
  selector: 'app-coverage-dropdown',
  templateUrl: './coverage-dropdown.component.html',
  styleUrls: ['./coverage-dropdown.component.css']
})
export class CoverageDropdownComponent implements OnInit {

  private coverage = {
    'user': true,
    'team': false,
    'region': false,
    'division': false
  }

  private stateLookup = {
    'user': { 'text': 'My View', 'class': 'fas fa-user' },
    'team': { 'text': 'Team View', 'class': 'fas fa-users' },
    'region': { 'text': 'Region View', 'class': 'fas fa-map-marked-alt' },
    'division': { 'text': 'Country View', 'class': 'fas fa-globe' }
  }

  dropdown = {
    'text': 'My View',
    'class': 'fas fa-user'
  }

  constructor(
    private BackendService: BackendService,
    private ContextManagerService: ContextManagerService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    if (this.UserService.getUserIsSet()) {
      this.fetchAndApplyCoverage();
      this.ContextManagerService.setCoverageLevel('user');
    } else {
      this.UserService.observeUserIsSet().subscribe(
        response => {
          if (response) {
            this.fetchAndApplyCoverage();
            this.ContextManagerService.setCoverageLevel('user');
          }
        }
      )
    }
  }

  ngAfterViewInit() {
    $('#coverageSelectDropdown').on('show.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('#coverageSelectDropdown').on('hide.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });
  }

  getCoverageAllowed(level: string) {
    if (level in this.coverage) {
      return this.coverage[level];
    } else {
      return false;
    }
  }

  setCoverage(level: string) {
    if (level in this.coverage) {
      if (this.coverage[level]) {
        this.dropdown = this.stateLookup[level];
        this.ContextManagerService.setCoverageLevel(level);
      }
    }
  }

  fetchAndApplyCoverage() {
    for (let grant of this.UserService.getGrants()) {
      this.BackendService.communicateWithBackend(
        'data/coverage-ng', {}, { role: grant }
      ).subscribe(
        (response) => {
          let coverageResponse = response['hierarchyAccessRights'].map(r => r['allowedLevel']);
          for (let level in this.coverage) {
            if (coverageResponse.includes(level)) {
              this.coverage[level] = true;
            }
          }
        }
      )
    }
  }

}
