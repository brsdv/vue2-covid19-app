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
    </section>
  </main>
</template>

<script>
import CardStats from './CardStats.vue'

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
</style>
