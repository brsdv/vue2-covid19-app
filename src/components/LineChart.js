import Vue from 'vue'
import { Line } from 'vue-chartjs'

export default Vue.component('line-chart', {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
