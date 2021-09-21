<template>
  <main class="grey lighten-5 pa-2 mt-4">
    <section>
      <h1 class="display-1">World summary stats</h1>
      <v-row class="ma-1" align="center" justify="center">
        <card-stats
          v-for="(card, index) in cards"
          :key="index"
          :cardTitle="card.title"
          :bgColor="card.bgColor"
          :cardIcon="card.icon"
          :cardAmount="card.amount"
          :cardAmountNew="card.amountNew"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1">Visuals</h2>
      <v-row class="mt-1" align="center" justify="center">
        <line-chart
          class="ma-4"
          v-for="(item, index) in visuals"
          :key="index"
          :chart-data="item.chartData"
          :options="item.options"
        ></line-chart>
      </v-row>
    </section>
  </main>
</template>

<script>
import CardStats from './CardStats'
// eslint-disable-next-line no-unused-vars
import LineChart from './LineChart'

export default {
  name: 'total',
  components: {
    CardStats
  },
  data () {
    return {
      cards: [
        {
          title: 'Total cases',
          bgColor: 'primary lighten-2',
          amount: 0,
          amountNew: 0,
          icon: 'mdi-alert-box'
        },
        {
          title: 'Deaths',
          bgColor: 'red accent-2',
          amount: 0,
          amountNew: 0,
          icon: 'mdi-emoticon-dead'
        },
        {
          title: 'Recoveries',
          bgColor: 'teal lighten-1',
          amount: 0,
          amountNew: 0,
          icon: 'mdi-hospital-box'
        }
      ],
      visuals: [],
      continents: null,
      allData: null
    }
  },
  mounted () {
    this.axios
      .get('https://corona.lmao.ninja/v2/continents?sort')
      .then(response => {
        this.continents = response
        this.updateStats()
      })
      .catch(error => {
        return console.error('An API error:', error)
      })

    this.axios
      .get('https://corona.lmao.ninja/v2/historical/all')
      .then(response => {
        this.allData = response
        this.updateVisuals()
      })
      .catch(error => {
        return console.error('An API error:', error)
      })
  },
  methods: {
    updateStats () {
      let data = this.continents.data
      let cases = 0
      let todayCases = 0
      let deaths = 0
      let todayDeaths = 0
      let recoveries = 0

      data.forEach(item => {
        cases += item.cases
        todayCases += item.todayCases
        deaths += item.deaths
        todayDeaths += item.todayDeaths
        recoveries += item.recovered
      })

      this.cards[0].amount += cases
      this.cards[0].amountNew += todayCases
      this.cards[1].amount += deaths
      this.cards[1].amountNew += todayDeaths
      this.cards[2].amount += recoveries
    },
    updateVisuals () {
      let data = this.allData.data
      let cases = data.cases
      let deaths = data.deaths
      let recoveries = data.recovered
      console.log(recoveries)

      let labels = []
      let casesPerDay = []
      let deathsPerDay = []
      let recoveriesPerDay = []

      for (let key in cases) {
        labels.push(key)
        casesPerDay.push(cases[key])
        deathsPerDay.push(deaths[key])
        recoveriesPerDay.push(recoveries[key])
      }

      this.visuals.push({
        id: 1,
        chartData: {
          labels: labels,
          datasets: [{
            label: 'Total cases',
            backgroundColor: '#6aaaff',
            data: casesPerDay
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })

      this.visuals.push({
        id: 2,
        chartData: {
          labels: labels,
          datasets: [{
            label: 'Deaths',
            backgroundColor: '#ff5252',
            data: deathsPerDay
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })

      this.visuals.push({
        id: 3,
        chartData: {
          labels: labels,
          datasets: [{
            label: 'Recoveries',
            backgroundColor: '#26a69a',
            data: recoveriesPerDay
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })

      // данные о выздоровевших за последние 24 часа (так как в апи нет свойства по подобию todayCases или todayDeaths)
      let lastDayRecoveries = recoveriesPerDay[recoveriesPerDay.length - 1] - recoveriesPerDay[recoveriesPerDay.length - 2]
      this.cards[2].amountNew += lastDayRecoveries
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.small {
  width: 100%;
  height: 100%;
  max-height: 400px;
  margin: auto;
}
</style>
