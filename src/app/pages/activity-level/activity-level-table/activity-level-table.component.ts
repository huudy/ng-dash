import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DatatablesService } from "../../../services/datatables.service";

declare var $: any;

@Component({
  selector: "app-activity-level-table",
  templateUrl: "./activity-level-table.component.html",
  styleUrls: ["./activity-level-table.component.css"]
})
export class ActivityLevelTableComponent implements OnInit, OnChanges {
  @Input() data;

  table = null;

  constructor(private DatatablesService: DatatablesService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.buildTable();
  }

  createProgressBar(data) {
    let barTemplate = `<div class="progress mt-1">
      <div role="progressbar" style="width: {{bar.width}}" class="progress-bar {{bar.color}}">{{bar.description}}</div>
      <div role="progressbar" style="width: {{bar.delta}}" class="progress-bar bg-secondary progress-bar-striped"></div>
    </div>`;

    let width = data["activityLevelCurrent"] * 10 + 10 + "%";
    let delta =
      (data["activityLevelPast"] - data["activityLevelCurrent"]) * 10 + "%";

    let color = "bg-danger";
    let description = "low";
    if (data["activityLevelCurrent"] >= 7) {
      color = "bg-success";
      description = "high";
    } else if (data["activityLevelCurrent"] >= 4) {
      color = "bg-warning";
      description = "moderate";
    }

    description += " (" + data["activityLevelCurrent"] + ")";

    let bar = barTemplate
      .replace("{{bar.width}}", width)
      .replace("{{bar.delta}}", delta)
      .replace("{{bar.color}}", color)
      .replace("{{bar.description}}", description);

    return bar;
  }

  buildTable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      "#activityLevelTable",
      {
        data: self.data,
        columns: [
          {
            data: "clientName"
            /*render: function(data, type, row) {
              if (type == 'export') {
                return data
              } else {
                return addClientTooltip(row)
              }
            }*/
          },
          { data: "activityLevelCurrent" },
          { data: "clientId", visible: false },
          { data: "clientMatchCodes", visible: false }
        ],
        columnDefs: [{ width: "30%", targets: 1 }],
        order: [[1, "asc"]],
        createdRow: function(row, data) {
          $("td:eq(0)", row).html(
            self.DatatablesService.addClientTooltip(data)
          );
          $("td:eq(1)", row).html(self.createProgressBar(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 2, 3, 1])
    );
  }
}
