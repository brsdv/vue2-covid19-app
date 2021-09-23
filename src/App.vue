<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      class="primary"
      dark
      app
    >
      <v-list>
        <v-list-item
          v-for="item in nav"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="primary"
      dense
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline">
        <v-icon>mdi-virus</v-icon> COVID-19
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title class="text-subtitle-1 font-weight-bold">
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
            >Top 5</span>
          </template>
          <span>Active cases</span>
        </v-tooltip>
      </v-toolbar-title>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country"
            @click="() => {}"
            link
            :to="'/country/' + country"
          >
            <v-list-item-title @click="updateCountry(country)">{{ country }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nav: [
        {
          title: 'World summary',
          icon: 'mdi-earth',
          link: '/'
        },
        {
          title: 'Countries',
          icon: 'mdi-flag',
          link: '/countries'
        }
      ],
      drawer: false
    }
  },
  mounted () {
    this.$store.dispatch('updateTopCountries')
  },
  methods: {
    updateCountry (country) {
      this.$store.dispatch('newCountryName', country)
    }
  },
  computed: {
    countries () {
      return this.$store.getters.topCountries
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
