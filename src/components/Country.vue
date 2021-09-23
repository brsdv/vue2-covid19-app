<template>
  <main class="grey lighten-5 pa-2 mt-4">
    <section>
      <v-row align="center">
        <h1 class="display-1 ml-3 mr-2">{{ queryName }}</h1>
        <v-img
          :src="countryFlag"
          max-width="48"
        ></v-img>
      </v-row>
      <v-row class="ma-1" align="center" justify="center">
        <card-stats
          v-for="card in countryDataCards"
          :key="card.title"
          :cardTitle="card.title"
          :bgColor="card.bgColor"
          :cardAmount="card.amount"
          :cardPerOneMillion="card.perOneMillion"
          :cardIcon="card.icon"
          :population="population"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1">Visuals</h2>
      <v-row class="mt-1" align="center" justify="center">
        <line-chart
          class="ma-4"
          v-for="visual in countryDataVisuals"
          :key="visual.id"
          :chart-data="visual.chartData"
          :options="visual.option"
        />
      </v-row>
    </section>
  </main>
</template>

<script>
import CardStats from './CardStats'
import LineChart from './LineChart'

export default {
  name: 'Country',
  components: {
    CardStats,
    LineChart
  },
  props: ['queryName'],
  data () {
    return {
      cards: [],
      visuals: []
    }
  },
  computed: {
    population () {
      return this.$store.getters.country.population
    },
    countryFlag () {
      return this.$store.getters.country.flag
    },
    countryDataCards () {
      let countryData = this.$store.getters.country
      let cards = []

      cards.push({ title: 'total cases', bgColor: 'primary lighten-2', amount: countryData.cases, perOneMillion: countryData.casesPerOneMillion, icon: 'mdi-alert-box' })
      cards.push({ title: 'deaths', bgColor: 'red accent-2', amount: countryData.deaths, perOneMillion: countryData.deathsPerOneMillion, icon: 'mdi-emoticon-dead' })
      cards.push({ title: 'recoveries', bgColor: 'teal lighten-1', amount: countryData.recoveries, perOneMillion: countryData.recoveriesPerOneMillion, icon: 'mdi-hospital-box' })

      return cards
    },
    countryDataVisuals () {
      let countryData = this.$store.getters.country
      let visuals = []

      visuals.push({
        id: 1,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Total cases',
            backgroundColor: '#6aaaff',
            data: countryData.visualData.cases
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })

      visuals.push({
        id: 2,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Deaths',
            backgroundColor: '#ff5252',
            data: countryData.visualData.deaths
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })

      visuals.push({
        id: 3,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Recoveries',
            backgroundColor: '#26a69a',
            data: countryData.visualData.recoveries
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })

      return visuals
    }
  }
}
</script>

<style scoped>
h1,
h2 {
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
 </style>
