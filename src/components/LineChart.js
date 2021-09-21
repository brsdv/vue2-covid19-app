import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Vue.component('line-chart', {
  extends: Line,
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
