<template>
  <main class="grey lighten-5 pa-2 mt-4">
    <section>
      <h1 class="display-1">{{ title }}</h1>
      <v-container class="mt-4" fluid>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="countries"
            :search="search"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template v-slot:item.country="{ item }">
              <v-row align="center">
                <v-img
                  :src="item.flag"
                  max-width="24"
                  class="ml-2 mr-2"
                ></v-img>
                <span>{{ item.country }}</span>
              </v-row>
            </template>
            <template v-slot:item.population="{ item }">
              <span class="grey--text text--darken-2 font-weight-bold">
                {{ item.population | numberFilter }}
              </span>
            </template>
            <template v-slot:item.cases="{ item }">
              <span class="primary--text text--lighten-2 font-weight-bold">
                {{ item.cases | numberFilter }}
              </span>
            </template>
            <template v-slot:item.todayCases="{ item }">
              <span class="primary--text text--lighten-2">
                {{ item.todayCases | numberFilter }}
              </span>
            </template>
            <template v-slot:item.deaths="{ item }">
              <span class="red--text text--accent-2 font-weight-bold">
                {{ item.deaths | numberFilter }}
              </span>
            </template>
            <template v-slot:item.todayDeaths="{ item }">
              <span class="red--text text--accent-2">
                {{ item.todayDeaths | numberFilter }}
              </span>
            </template>
            <template v-slot:item.recovered="{ item }">
              <span class="teal--text text--lighten-1 font-weight-bold">
                {{ item.recovered | numberFilter }}
              </span>
            </template>
            <template v-slot:item.todayRecovered="{ item }">
              <span class="teal--text text--lighten-1">
                {{ item.todayRecovered | numberFilter }}
              </span>
            </template>
            <template v-slot:item.active="{ item }">
              <v-chip
                color="red lighten-1"
                outlined
              >
                {{ item.active | numberFilter }}
              </v-chip>
            </template>
            <template v-slot:item.critical="{ item }">
              <span>
                {{ item.critical | numberFilter }}
              </span>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </section>
  </main>
</template>

<script>
export default {
  name: 'countries',
  data () {
    return {
      title: 'Countries statistics',
      search: '',
      sortBy: 'active',
      sortDesc: true,
      headers: [
        {
          text: 'Country',
          align: 'start',
          value: 'country'
        },
        { text: 'Population', value: 'population' },
        { text: 'Cases', value: 'cases' },
        { text: 'Today cases', value: 'todayCases' },
        { text: 'Deaths', value: 'deaths' },
        { text: 'Today deaths', value: 'todayDeaths' },
        { text: 'Recovered', value: 'recovered' },
        { text: 'Today recovered', value: 'todayRecovered' },
        { text: 'Active', value: 'active' },
        { text: 'Critical', value: 'critical' }
      ],
      countries: []
    }
  },
  mounted () {
    this.axios
      .get('https://corona.lmao.ninja/v2/countries?sort')
      .then(response => {
        this.countries = response
        this.updateCounries()
      })
      .catch(error => {
        return console.error('An API error:', error)
      })
  },
  methods: {
    getColor (cases) {
      if (cases > 400) return 'red'
      else if (cases > 200) return 'orange'
      else return 'green'
    },
    updateCounries () {
      let data = this.countries.data.map(item => {
        return {
          country: item.country,
          flag: item.countryInfo.flag,
          population: item.population,
          cases: item.cases,
          todayCases: item.todayCases,
          deaths: item.deaths,
          todayDeaths: item.todayDeaths,
          recovered: item.recovered,
          todayRecovered: item.todayRecovered,
          active: item.active,
          critical: item.critical
        }
      })

      this.countries = data
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
