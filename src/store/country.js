import Country from './countryPrototype'
import axios from 'axios'

export default {
  state: {
    currCountryName: null,
    countries: [],
    topCountries: []
  },
  mutations: {
    newCountry (state, payload) {
      state.countries.push(payload)
    },
    newCountryName (state, payload) {
      state.currCountryName = payload
    },
    newTopCountry (state, payload) {
      state.topCountries = payload
    }
  },
  actions: {
    newCountry ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      Promise.all([
        axios.get(`https://corona.lmao.ninja/v2/historical/${payload}?lastdays=30`),
        axios.get(`https://corona.lmao.ninja/v2/countries/${payload}`)
      ])
        .then(response => {
          const historical = response[0].data
          const countries = response[1].data

          let labels = []
          let datasets = {}
          let cases = []
          let deaths = []
          let recoveries = []

          for (let key in historical.timeline.cases) {
            labels.push(key)

            cases.push(historical.timeline.cases[key])
            deaths.push(historical.timeline.deaths[key])
            recoveries.push(historical.timeline.recovered[key])
          }

          datasets['cases'] = cases
          datasets['deaths'] = deaths
          datasets['recoveries'] = recoveries

          let id = getters.countryId

          const сountry = new Country(
            id,
            historical.country,
            countries.countryInfo.flag,
            countries.population,
            countries.cases,
            countries.deaths,
            countries.recovered,
            countries.casesPerOneMillion,
            countries.deathsPerOneMillion,
            countries.recoveredPerOneMillion,
            datasets,
            labels
          )

          // console.log('new state is', this.state)

          commit('setLoading', false)
          commit('newCountry', сountry)
        })
    },
    newCountryName ({ commit }, payload) {
      commit('newCountryName', payload)
    },
    updateTopCountries ({ commit, dispatch }) {
      commit('clearError')
      commit('setLoading', true)

      axios
        .get('https://corona.lmao.ninja/v2/countries?sort=active')
        .then((response) => {
          let data = response.data.slice(0, 5)
          data = data.map((item) => item.country)

          commit('newTopCountry', data)

          for (let country of data) {
            dispatch('newCountry', country)
          }

          commit('setLoading', false)
        })
    }
  },
  getters: {
    country (state) {
      // console.log('data is', state.countries.find(country => country.name === state.currCountryName))
      return state.countries.find(country => country.name === state.currCountryName)
    },
    currentCountry (state) {
      // console.log('currentCountry', state.currCountryName)
      return state.currCountryName
    },
    countryId (state) {
      return state.countries.length
    },
    topCountries (state) {
      // console.log('countries:', state.countries)
      return state.topCountries
    }
  }
}
