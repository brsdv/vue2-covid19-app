<template>
  <main class="grey lighten-5 pa-2">
    <section>
      <h1 class="display-1">World summary stats</h1>
      <v-row align="center" justify="center">
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
      <div class="small">
        <line-chart
          v-for="(item, index) in visuals"
          :key="index"
          :chart-data="item.chartData"
          :options="item.options"
        ></line-chart>
      </div>
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
          title: 'total cases',
          bgColor: 'primary lighten-2',
          amount: 1000,
          amountNew: 200,
          icon: 'mdi-alert-box'
        },
        {
          title: 'deaths',
          bgColor: 'red accent-2',
          amount: 1000,
          amountNew: 200,
          icon: 'mdi-emoticon-dead'
        },
        {
          title: 'recoveries',
          bgColor: 'teal lighten-1',
          amount: 1000,
          amountNew: 200,
          icon: 'mdi-hospital-box'
        }
      ],
      visuals: [
        {
          chartData: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                label: 'Data',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        }
      ]
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
