import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {HomeService} from "../../../services/home.service";

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {

  datas;
  labels;

  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend;
  barChartPlugins;
  public chartColors: any[];
  barChartData: ChartDataSets[];

  constructor(private homeService:HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getCaisse().subscribe((response)=> {
      this.datas=response["nbr"];
      this.labels=response["annees"];
      this.setChart();
    });
  }

  setChart(){
    this.barChartOptions={
      responsive: true,
    };
    this.barChartLabels=this.labels;
    this.barChartType='bar';
    this.barChartLegend=true;
    this.barChartPlugins = [];
    this.chartColors= [
      {
        backgroundColor:["#FC544B", "#FFA426", "#47C363", "#FFFCC4", "#B9E8E0"]
      }];
    this.barChartData= [
      { data: this.datas, label: 'La caisse'}
    ];
  }

}
