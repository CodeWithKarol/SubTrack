import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscriptions } from '../subscriptions-data';
import { Header } from '../header/header';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from '../subscription.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteSubscriptionDialog } from '../delete-subscription-dialog/delete-subscription-dialog';
import { filter, take, tap } from 'rxjs';
import { EditSubscriptionDialog } from '../edit-subscription-dialog/edit-subscription-dialog';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { CurrencyPipe } from '@angular/common';
import { AddSubscriptionDialog } from '../add-subscription-dialog/add-subscription-dialog';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
};

export type BarChartOptions = {
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
  imports: [
    MatCardModule,
    MatIconModule,
    Header,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    CurrencyPipe,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'subscriptions');
  item$ = collectionData<any>(this.itemCollection);

  private readonly subscriptionsData = inject(Subscriptions);
  private readonly dialog = inject(MatDialog);
  protected subscriptions = this.subscriptionsData.subscriptionsData;
  protected totalCost = this.subscriptionsData.totalCost;
  // Computed property to group and sum costs by category
  protected categoryData = computed(() => {
    const subscriptions = this.subscriptionsData.subscriptionsData();
    const categoryMap = new Map<string, number>();

    // Group by category and sum costs
    subscriptions.forEach((sub) => {
      const currentSum = categoryMap.get(sub.category) || 0;
      categoryMap.set(sub.category, currentSum + sub.cost);
    });

    return {
      labels: Array.from(categoryMap.keys()),
      series: Array.from(categoryMap.values()),
    };
  });

  pieChartOptions: PieChartOptions = {
    series: this.categoryData().series,
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: this.categoryData().labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (val) {
          return `$${val.toFixed(2)}`;
        },
      },
    },
  };
  barChartOptions: BarChartOptions = {
    series: [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands';
        },
      },
    },
    legend: {},
  };

  constructor() {
    this.item$.subscribe((data) => {
      console.log(data);
    });
  }

  deleteSubscription(subscriptionId: number): void {
    const subscription = this.subscriptions().find((sub) => sub.id === subscriptionId);

    if (!subscription) {
      return;
    }

    this.dialog
      .open(DeleteSubscriptionDialog, {
        data: { name: subscription.name },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((result: boolean) => Boolean(result)),
        tap(() => this.subscriptionsData.removeSubscription(subscriptionId)),
      )
      .subscribe();
  }

  editSubscription(subscriptionId: number): void {
    const subscription = this.subscriptions().find((sub) => sub.id === subscriptionId);

    if (!subscription) {
      return;
    }

    this.dialog
      .open(EditSubscriptionDialog, { data: { subscription } })
      .afterClosed()
      .pipe(
        take(1),
        filter((result: Subscription) => Boolean(result)),
        tap((updatedSubscription: Subscription) =>
          this.subscriptionsData.updateSubscription(updatedSubscription),
        ),
      )
      .subscribe();
  }

  addSubscription(): void {
    this.dialog
      .open(AddSubscriptionDialog)
      .afterClosed()
      .pipe(
        take(1),
        filter((result: Subscription) => Boolean(result)),
        tap((result: Subscription) => this.subscriptionsData.addSubscription(result)),
      )
      .subscribe();
  }
}
