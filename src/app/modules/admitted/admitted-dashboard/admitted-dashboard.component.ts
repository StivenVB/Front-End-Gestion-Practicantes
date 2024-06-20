import { Component, OnInit } from '@angular/core';
import { AdmittedService } from '../../../services/admitted/admitted.service';
import { AdmittedModel } from '../../../models/admitted/admitted.model';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admitted-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './admitted-dashboard.component.html',
  styleUrls: ['./admitted-dashboard.component.css']
})
export class AdmittedDashboardComponent implements OnInit {
  recordList: AdmittedModel[] = [];
  isLoading: boolean = true;

  public single: { name: string, value: number }[] = [];
  public multi: any[] = [];
  public view: [number, number] = [700, 400];

  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Estado';
  public yAxisLabel: string = 'Cantidad';
  public colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  public pieChartLabels: string[] = [];
  public pieChartData: { name: string, value: number }[] = [];
  public lineChartData: any[] = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private service: AdmittedService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getRecordList();
  }

  getRecordList() {
    this.service.getAllRecords().subscribe(
      records => {
        this.recordList = records;
        this.calculateStatusCounts();
        this.calculateYearlyData();
        this.isLoading = false;
        this.spinner.hide();
      },
      error => {
        this.isLoading = false;
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error.',
          text: 'Hay un problema con la comunicación interna.'
        });
      }
    );
  }

  calculateStatusCounts() {
    const approvedCount = this.recordList.filter(p => p.postulationStatus?.toLowerCase() === 'aprobado').length;
    const rejectedCount = this.recordList.filter(p => p.postulationStatus?.toLowerCase() === 'rechazado' || p.postulationStatus?.toLowerCase() === 'rechazada').length;
    this.single = [
      { name: 'Aprobado', value: approvedCount },
      { name: 'Rechazado', value: rejectedCount }
    ];
    this.pieChartData = this.single;  // Reutilizar los datos para el gráfico de torta
  }

  calculateYearlyData() {
    const yearCounts: { [key: string]: { name: string, series: { name: string, value: number }[] } } = {};

    this.recordList.forEach(record => {
      const year = record.offerYear?.toString();
      const status = record.postulationStatus?.toLowerCase();

      if (year && status) {
        if (!yearCounts[year]) {
          yearCounts[year] = { name: year, series: [] };
        }

        const existingStatus = yearCounts[year].series.find(s => s.name === status);
        if (existingStatus) {
          existingStatus.value += 1;
        } else {
          yearCounts[year].series.push({ name: status, value: 1 });
        }
      }
    });

    this.multi = Object.values(yearCounts);
    this.lineChartData = this.multi;
  }
}
