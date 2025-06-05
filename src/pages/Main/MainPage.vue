<template>
  <div class="row">
    <div class="col-lg-7">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="card-category">Iris Hub home page</h5>
              <h2 class="card-title">Iris Hub</h2>
              <div>
                <button type="primary">Test 1</button>
                <button type="primary">Test 2</button>
                <button type="primary">Test 3</button>
              </div>
            </div>
          </div>
        </template>
      </card>
    </div>
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
              <h5 class="card-category">Total shipments</h5>
              <h2 class="card-title">Performance</h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div class="btn-group btn-group-toggle" :class="isRTL ? 'float-left' : 'float-right'" data-toggle="buttons">
                <label
                  v-for="(option, index) in bigLineChartCategories"
                  :key="option.name"
                  class="btn btn-sm btn-primary btn-simple"
                  :class="{ active: bigLineChart.activeIndex === index }"
                  :id="index"
                >
                  <input type="radio" @click="initBigChart(index)" name="options" autocomplete="off" :checked="bigLineChart.activeIndex === index" />
                  <span class="d-none d-sm-block">{{ option.name }}</span>
                  <span class="d-block d-sm-none">
                    <i :class="option.icon"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <!-- Stats Cards -->
    <div class="col-lg-3 col-md-6" v-for="card in statsCards" :key="card.title">
      <stats-card :title="card.title" :sub-title="card.subTitle" :type="card.type" :icon="card.icon">
        <div slot="footer" v-html="card.footer"></div>
      </stats-card>
    </div>

    <!-- Small charts -->
    <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Total Shipments</h5>
          <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary"></i> 763,215</h3>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            :chart-data="purpleLineChart.chartData"
            :gradient-colors="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Daily Sales</h5>
          <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info"></i> 3,500€</h3>
        </template>
        <div class="chart-area">
          <bar-chart style="height: 100%" :chart-data="blueBarChart.chartData" :gradient-stops="blueBarChart.gradientStops" :extra-options="blueBarChart.extraOptions"> </bar-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Completed tasks</h5>
          <h3 class="card-title"><i class="tim-icons icon-send text-success"></i> 12,100K</h3>
        </template>
        <div class="chart-area">
          <line-chart style="height: 100%" :chart-data="greenLineChart.chartData" :gradient-stops="greenLineChart.gradientStops" :extra-options="greenLineChart.extraOptions"> </line-chart>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import StatsCard from 'src/components/Cards/StatsCard';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

let bigChartData = [
  [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
];
let bigChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
};

export default {
  components: {
    LineChart,
    BarChart,
    StatsCard,
  },
  name: 'iris-page',
  data() {
    return {
      statsCards: [
        {
          title: '150GB',
          subTitle: 'Number',
          type: 'warning',
          icon: 'tim-icons icon-chat-33',
          footer: '<i class="tim-icons icon-refresh-01"></i> Update Now',
        },
        {
          title: '+45K',
          subTitle: 'Followers',
          type: 'primary',
          icon: 'tim-icons icon-shape-star',
          footer: '<i class="tim-icons icon-sound-wave"></i></i> Last Research',
        },
        {
          title: '150,000',
          subTitle: 'Users',
          type: 'info',
          icon: 'tim-icons icon-single-02',
          footer: '<i class="tim-icons icon-trophy"></i> Customer feedback',
        },
        {
          title: '23',
          subTitle: 'Errors',
          type: 'danger',
          icon: 'tim-icons icon-molecule-40',
          footer: '<i class="tim-icons icon-watch-time"></i> In the last hours',
        },
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              ...bigChartDatasetOptions,
              data: bigChartData[0],
            },
          ],
          labels: bigChartLabels,
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Data',
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
          datasets: [
            {
              label: 'My First dataset',
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
        gradientStops: [1, 0.4, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
          datasets: [
            {
              label: 'Countries',
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return [
        { name: 'Accounts', icon: 'tim-icons icon-single-02' },
        { name: 'Purchases', icon: 'tim-icons icon-gift-2' },
        { name: 'Sessions', icon: 'tim-icons icon-tap-02' },
      ];
    },
  },
};
</script>
<style></style>
