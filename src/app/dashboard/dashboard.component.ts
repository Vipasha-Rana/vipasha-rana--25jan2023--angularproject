import { Component, VERSION, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FilterPipe } from 'src/pipes/filter.pipe';

@Component({
  selector: 'my-app',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSticky = true;

  name = 'Angular ' + VERSION.major;
  startIndex = 0;
  endIndex = 5;
  data$: Observable<any> = of([]);
  filterText = '';
  constructor(private httpClient: HttpClient) {}
  getArrayLenght(length: number) {
    return new Array(length / 20);
  }
  ngOnInit() {
    this.data$ = this.httpClient.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  getIndex(pageIndex: number) {
    this.startIndex = pageIndex * 5;
    this.endIndex = this.startIndex + 5;
    console.log(this.startIndex);
  }
  prevIndex(length: number) {
    this.startIndex = length * 0;
    console.log(this.startIndex);
  }
  nextIndex(endIndex: number) {
    this.endIndex++;
    console.log(this.endIndex);
  }

  filterData() {
    this.data$ = this.data$.pipe(
      map((data: any[]) =>
        data.filter((d: any) =>
          d.title.toLowerCase().includes(this.filterText.toLowerCase())
        )
      )
    );
  }



  generateRandomData = () => {
    var y = 1000,
      dps = [];
    for (var i = 0; i < 1000; i++) {
      y += Math.ceil(Math.random() * 10 - 5);
      dps.push({ y: y });
    }
    return dps;
  };
  chartOptions = {
    zoomEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Try Zooming & Panning',
    },
    data: [
      {
        type: 'line',
        dataPoints: this.generateRandomData(),
      },
    ],
  };
  chart: any;

  chartOptions1 = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Actual vs Projected Sales',
    },
    axisX: {
      valueFormatString: 'D MMM',
    },
    axisY: {
      title: 'Number of Sales',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'line',
        showInLegend: true,
        name: 'Projected Sales',
        xValueFormatString: 'MMM DD, YYYY',
        dataPoints: [
          { x: new Date(2021, 8, 1), y: 63 },
          { x: new Date(2021, 8, 2), y: 69 },
          { x: new Date(2021, 8, 3), y: 65 },
          { x: new Date(2021, 8, 4), y: 70 },
          { x: new Date(2021, 8, 5), y: 71 },
          { x: new Date(2021, 8, 6), y: 65 },
          { x: new Date(2021, 8, 7), y: 73 },
          { x: new Date(2021, 8, 8), y: 86 },
          { x: new Date(2021, 8, 9), y: 74 },
          { x: new Date(2021, 8, 10), y: 75 },
          { x: new Date(2021, 8, 11), y: 76 },
          { x: new Date(2021, 8, 12), y: 84 },
          { x: new Date(2021, 8, 13), y: 87 },
          { x: new Date(2021, 8, 14), y: 76 },
          { x: new Date(2021, 8, 15), y: 79 },
        ],
      },
      {
        type: 'line',
        showInLegend: true,
        name: 'Actual Sales',
        dataPoints: [
          { x: new Date(2021, 8, 1), y: 60 },
          { x: new Date(2021, 8, 2), y: 57 },
          { x: new Date(2021, 8, 3), y: 51 },
          { x: new Date(2021, 8, 4), y: 56 },
          { x: new Date(2021, 8, 5), y: 54 },
          { x: new Date(2021, 8, 6), y: 55 },
          { x: new Date(2021, 8, 7), y: 54 },
          { x: new Date(2021, 8, 8), y: 69 },
          { x: new Date(2021, 8, 9), y: 65 },
          { x: new Date(2021, 8, 10), y: 66 },
          { x: new Date(2021, 8, 11), y: 63 },
          { x: new Date(2021, 8, 12), y: 67 },
          { x: new Date(2021, 8, 13), y: 66 },
          { x: new Date(2021, 8, 14), y: 56 },
          { x: new Date(2021, 8, 15), y: 64 },
        ],
      },
    ],
  };

  step: number = Math.pow(10, 0.05);
  chartOptions2 = {
    zoomEnabled: true,
    zoomType: 'xy',
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Frequency Response of Low Pass Filters',
    },
    subtitles: [
      {
        text: 'X Axis scale is Logarithmic',
        fontSize: 14,
      },
    ],
    axisX: {
      logarithmic: true,
      title: 'Frequency \u03C9(rad/s)',
      minimum: 0.01,
      suffix: '\u03C9\u2099',
      stripLines: [
        {
          value: 1,
          label: 'Cutoff Frequency',
          labelFontColor: '#808080',
          labelAlign: 'near',
        },
      ],
    },
    axisY: {
      title: 'Type 1 Magnitude (db)',
      lineThickness: 1,
      lineColor: '#6D78AD',
      tickColor: '#6D78AD',
      titleFontColor: '#6D78AD',
      labelFontColor: '#6D78AD',
    },
    axisY2: {
      title: 'Type 2 Magnitude (db)',
      lineThickness: 1,
      lineColor: '#51CDA0',
      tickColor: '#51CDA0',
      titleFontColor: '#51CDA0',
      labelFontColor: '#51CDA0',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'line',
        name: 'Type 1 Filter',
        showInLegend: true,
        yValueFormatString: '#,##0.00 db',
        xValueFormatString: '\u03C9 = #,##0.00#\u03C9\u2099',
        dataPoints: this.type1DataPoints(this.step),
      },
      {
        type: 'line',
        name: 'Type 2 Filter',
        color: '#51CDA0',
        showInLegend: true,
        axisYType: 'secondary',
        yValueFormatString: '#,##0.00 db',
        xValueFormatString: '\u03C9 = #,##0.00#\u03C9\u2099',
        dataPoints: this.type2DataPoints(0.02, this.step),
      },
    ],
  };

  type1DataPoints(step: any) {
    var dataPoints = [];
    var h;
    for (var w = 0.01; w < 100; w *= step) {
      h = -5 * Math.log(w * w + 1);
      dataPoints.push({ x: w, y: h });
    }
    return dataPoints;
  }

  type2DataPoints(e: any, step: any) {
    var dataPoints = [];
    var h;
    for (var w = 0.01; w < 100; w *= step) {
      h = -5 * Math.log(Math.pow(1 - w * w, 2) + 4 * e * e * w * w);
      dataPoints.push({ x: w, y: h });
    }
    return dataPoints;
  }

  dps = [
    { x: 1, y: 10 },
    { x: 2, y: 13 },
    { x: 3, y: 18 },
    { x: 4, y: 20 },
    { x: 5, y: 17 },
    { x: 6, y: 10 },
    { x: 7, y: 13 },
    { x: 8, y: 18 },
    { x: 9, y: 20 },
    { x: 10, y: 17 },
  ];

  chartOptions3 = {
    exportEnabled: true,
    title: {
      text: 'Angular Dynamic Chart',
    },
    data: [
      {
        type: 'line',
        dataPoints: this.dps,
      },
    ],
  };
  getChartInstance(chart: object) {
    this.chart = chart;
    setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  }
  updateChart = () => {
    var yVal =
      this.dps[this.dps.length - 1].y +
      Math.round(5 + Math.random() * (-5 - 5));
    this.dps.push({ x: this.dps[this.dps.length - 1].x + 1, y: yVal });

    if (this.dps.length > 10) {
      this.dps.shift();
    }
    this.chart.render();
    setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  };

  chartOptions4 = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: 'World Population Growth Rate',
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 'bold',
    },
    axisY: {
      title: 'Annual Population Growth (in %)',
      valueFormatString: "#,###.##'%'",
    },
    data: [
      {
        type: 'spline',
        xValueFormatString: 'YYYY',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { x: new Date(1961, 0, 1), y: 1.30072410817561 },
          { x: new Date(1962, 0, 1), y: 1.7243462047616 },
          { x: new Date(1963, 0, 1), y: 2.08332248580949 },
          { x: new Date(1964, 0, 1), y: 2.05319982551457 },
          { x: new Date(1965, 0, 1), y: 2.05524143402917 },
          { x: new Date(1966, 0, 1), y: 2.10866788828604 },
          { x: new Date(1967, 0, 1), y: 2.04952806653054 },
          { x: new Date(1968, 0, 1), y: 2.0557795099968 },
          { x: new Date(1969, 0, 1), y: 2.08817694565934 },
          { x: new Date(1970, 0, 1), y: 2.09125276275897 },
          { x: new Date(1971, 0, 1), y: 2.13311686340344 },
          { x: new Date(1972, 0, 1), y: 2.03121137162374 },
          { x: new Date(1973, 0, 1), y: 1.98294336877748 },
          { x: new Date(1974, 0, 1), y: 1.92954936287425 },
          { x: new Date(1975, 0, 1), y: 1.8558336723775 },
          { x: new Date(1976, 0, 1), y: 1.79507967654773 },
          { x: new Date(1977, 0, 1), y: 1.74961533313858 },
          { x: new Date(1978, 0, 1), y: 1.74802018504161 },
          { x: new Date(1979, 0, 1), y: 1.7620417897177 },
          { x: new Date(1980, 0, 1), y: 1.74866104222924 },
          { x: new Date(1981, 0, 1), y: 1.76406767844979 },
          { x: new Date(1982, 0, 1), y: 1.80049048590014 },
          { x: new Date(1983, 0, 1), y: 1.78432403887979 },
          { x: new Date(1984, 0, 1), y: 1.74712530080474 },
          { x: new Date(1985, 0, 1), y: 1.74895086012958 },
          { x: new Date(1986, 0, 1), y: 1.76830078138659 },
          { x: new Date(1987, 0, 1), y: 1.78300118456379 },
          { x: new Date(1988, 0, 1), y: 1.77018316822685 },
          { x: new Date(1989, 0, 1), y: 1.73856862522462 },
          { x: new Date(1990, 0, 1), y: 1.73544185116863 },
          { x: new Date(1991, 0, 1), y: 1.66842050994094 },
          { x: new Date(1992, 0, 1), y: 1.57292819054604 },
          { x: new Date(1993, 0, 1), y: 1.56456504240188 },
          { x: new Date(1994, 0, 1), y: 1.52044016094899 },
          { x: new Date(1995, 0, 1), y: 1.50599110708553 },
          { x: new Date(1996, 0, 1), y: 1.45269465711498 },
          { x: new Date(1997, 0, 1), y: 1.427219157415 },
          { x: new Date(1998, 0, 1), y: 1.39160819986147 },
          { x: new Date(1999, 0, 1), y: 1.35179096679923 },
          { x: new Date(2000, 0, 1), y: 1.32307577883421 },
          { x: new Date(2001, 0, 1), y: 1.2975934295266 },
          { x: new Date(2002, 0, 1), y: 1.27680831188725 },
          { x: new Date(2003, 0, 1), y: 1.26147763010064 },
          { x: new Date(2004, 0, 1), y: 1.25426340053367 },
          { x: new Date(2005, 0, 1), y: 1.24692384480321 },
          { x: new Date(2006, 0, 1), y: 1.24369497414078 },
          { x: new Date(2007, 0, 1), y: 1.23574121285958 },
          { x: new Date(2008, 0, 1), y: 1.24085406678891 },
          { x: new Date(2009, 0, 1), y: 1.22174269013 },
          { x: new Date(2010, 0, 1), y: 1.20333276891564 },
          { x: new Date(2011, 0, 1), y: 1.17025832977265 },
          { x: new Date(2012, 0, 1), y: 1.18393451235548 },
          { x: new Date(2013, 0, 1), y: 1.18384476275419 },
          { x: new Date(2014, 0, 1), y: 1.18021596062547 },
          { x: new Date(2015, 0, 1), y: 1.16873977624677 },
          { x: new Date(2016, 0, 1), y: 1.16374431044332 },
          { x: new Date(2017, 0, 1), y: 1.14385698082209 },
          { x: new Date(2018, 0, 1), y: 1.10615060940842 },
          { x: new Date(2019, 0, 1), y: 1.06513053318513 },
          { x: new Date(2020, 0, 1), y: 1.03599084817998 },
        ],
      },
    ],
  };
}
