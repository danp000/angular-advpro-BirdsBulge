import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
    `
    #chart {
        width: 90%; 
      }
    @media (max-width: 940px) {

      #chart {
        width: 120%;
      }
    }
  `,
  ]
})
export class DoughnutComponent implements OnInit {
 
  @Input() title: string = '';

  @Input('tags') public doughnutChartLabels: string[] = ['Labour', 'License', 'Insurance', 'Facilities', 'Taxes'];
  @Input() data: number[] = [ 45, 71, 93, 56, 112 ]; 

  ngOnInit(): void {

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#E3D509', '#FA910D', '#38EB18', '#F53818', '#2562CC'],
          borderColor: ['#4FF01F', '#E67726', '#D7FC47', '#F04D78', '#0EE67A'],
          hoverBackgroundColor: ['#EBE41C', '#FF9A11', '#4AD916', '#F52718', '#1947E6'],
          hoverBorderColor: ['#F7FAF9', '#F7FAF9', '#F6F7F4', '#F6F7F4', '#F6F7F4', '#F7FAF9']
        } 
      ]
    } 
  }

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data,
      },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

}
