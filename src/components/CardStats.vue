<template>
  <v-card
    :class="['summary-card rounded-lg ma-4 pt-6', bgColor]"
    max-width="300"
    outlined
    tile
    dark
  >
    <div class="icon-wrapper">
      <v-icon>{{ cardIcon }}</v-icon>
    </div>
    <v-card-title class="headline text-bold">
      <v-tooltip
        v-if="population"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <span
            class="count"
            v-bind="attrs"
            v-on="on"
          >{{ cardAmount | numberFilter }}</span>
        </template>
        <span>Population: {{ population | numberFilter }}</span>
      </v-tooltip>
      <span
        v-else
        class="count"
      >{{ cardAmount | numberFilter }}</span>
    </v-card-title>
    <v-card-subtitle class="text-center text-bold">
      {{ cardTitle }}
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">
        More
      </div>

      <v-timeline
        dense
        light
      >
        <v-timeline-item
          v-if="cardAmountToday"
          small
          light
        >
          <div>
            <div class="font-weight-normal">
              Count today
            </div>
            <div class="font-weight-bold white--text">
              {{ cardAmountToday | numberFilter }}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          v-if="cardPerOneMillion"
          small
          light
        >
          <div>
            <div class="font-weight-normal">
              Per one million
            </div>
            <div class="font-weight-bold white--text">
              {{ cardPerOneMillion | numberFilter }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'card-stats',
  props: {
    bgColor: String,
    cardIcon: String,
    cardTitle: String,
    cardAmount: Number,
    cardAmountToday: Number,
    cardPerOneMillion: Number,
    population: Number
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}

.icon-wrapper > .v-icon {
  margin: auto;
  width: 100%;
  font-size: 2rem;
}

.summary-card {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.summary-card .headline > .count {
  width: 100%;
  text-align: center;
}
</style>
