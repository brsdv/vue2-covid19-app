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
          :cardAmountToday="card.amountToday"
          :cardPerOneMillion="card.perOneMillion"
          :population="population"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1">Visuals</h2>
      <v-row class="mt-1" align="center">
        <line-chart
          class="small ma-4"
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
          code: 'cases',
          title: 'Total cases',
          bgColor: 'primary lighten-2',
          amount: 0,
          amountToday: 0,
          perOneMillion: 0,
          icon: 'mdi-alert-box'
        },
        {
          code: 'deaths',
          title: 'Deaths',
          bgColor: 'red accent-2',
          amount: 0,
          amountToday: 0,
          perOneMillion: 0,
          icon: 'mdi-emoticon-dead'
        },
        {
          code: 'recoveries',
          title: 'Recoveries',
          bgColor: 'teal lighten-1',
          amount: 0,
          amountToday: 0,
          perOneMillion: 0,
          icon: 'mdi-hospital-box'
        }
      ],
      population: 0,
      visuals: [],
      worldStatAll: null,
      allData: null
    }
  },
  mounted () {
    this.axios
      .get('https://corona.lmao.ninja/v2/all')
      .then(response => {
        this.worldStatAll = response
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
      let data = this.worldStatAll.data

      this.population = data.population
      this.cards.forEach(item => {
        if (item.code === 'cases') {
          item.amount = data.cases
          item.amountToday = data.todayCases
          item.perOneMillion = data.casesPerOneMillion
        }

        if (item.code === 'deaths') {
          item.amount = data.deaths
          item.amountToday = data.todayDeaths
          item.perOneMillion = data.deathsPerOneMillion
        }

        if (item.code === 'recoveries') {
          item.amount = data.recovered
          item.amountToday = data.todayRecovered
          item.perOneMillion = data.recoveredPerOneMillion
        }
      })
    },
    updateVisuals () {
      let data = this.allData.data
      let cases = data.cases
      let deaths = data.deaths
      let recoveries = data.recovered

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
