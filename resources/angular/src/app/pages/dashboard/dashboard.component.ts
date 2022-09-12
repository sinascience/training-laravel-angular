import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RekapService } from '../rekap/services/rekap.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  listRekap: any;
  hari_ini: number;
  kemarin: number;
  bulan_lalu: number;
  bulan_ini: number;
  data: boolean;
  listYear: any;
  year: any;
  dataHariIni: any;


  constructor(
    private modalService: NgbModal,
    private rekapService: RekapService
  ) {  }

  ngOnInit(): void {

    this.listYear = [2020, 2021, 2022, 2023];
    this.hari_ini = 0;
    this.kemarin = 0;
    this.bulan_lalu = 0;
    this.bulan_ini = 0;

    this.rekapService.getRekapPerHari().subscribe((res: any) => {
      this.hari_ini += res.data[0].hari_ini;
      this.kemarin += res.data[0].kemarin;
      this.bulan_lalu += res.data[0].bulan_lalu;
      this.bulan_ini += res.data[0].bulan_ini;
  }, (err: any) => {
      console.log(err);
  });
  
    this.getRekap('')
    this.data = false;
    
  }

  getRekap(year) {
    this.year = year;
        const params = {
          filter: JSON.stringify({}),
          year: this.year
      };
      
      this.rekapService.getRekapBulanan(params).subscribe((res: any) => {
          this.listRekap = res.data[0];
          
          this.chartOptions = {
            series: [
              {
                name: "Total Penjualan",
                data: [this.listRekap.jan, 
                  this.listRekap.feb, 
                  this.listRekap.mar, 
                  this.listRekap.apr, 
                  this.listRekap.mei, 
                  this.listRekap.jun, 
                  this.listRekap.jul, 
                  this.listRekap.aug, 
                  this.listRekap.sep, 
                  this.listRekap.okt, 
                  this.listRekap.nov, 
                  this.listRekap.des]
              },
            ],
            chart: {
              type: "bar",
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%"
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Des"
              ]
            },
            yaxis: {
              labels: {
                formatter: function(val) {
                  if(val != 0) {
                  let prefix = ' '
                  let string = val.toString()
                  let number_string = string.replace(/[^,\d]/g, '').toString(),
                  split   		= number_string.split(','),
                  sisa     		= split[0].length % 3,
                  rupiah     		= split[0].substr(0, sisa),
                  ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
                
                  // tambahkan titik jika yang di input sudah menjadi val ribuan
                  if(ribuan){
                    let separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                  }
                
                  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
                }
                }
              },
              title: {
                text: "Rupiah"
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function(val) {
                  let prefix = 'Rp. '
                  let string = val.toString()
                  let number_string = string.replace(/[^,\d]/g, '').toString(),
                  split   		= number_string.split(','),
                  sisa     		= split[0].length % 3,
                  rupiah     		= split[0].substr(0, sisa),
                  ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
                
                  // tambahkan titik jika yang di input sudah menjadi val ribuan
                  if(ribuan){
                    let separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                  }
                
                  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
                }
              }
            },
          }

          if(res.data.length == 0) {
            this.data = false;
            } else {
            this.data = true;
            }
      }, (err: any) => {
          console.log(err);
      });

    
    };
  }


