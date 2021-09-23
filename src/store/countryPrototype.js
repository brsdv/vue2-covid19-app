export default class Country {
  constructor (
    id,
    name,
    flag,
    population,
    cases,
    deaths,
    recoveries,
    casesPerOneMillion,
    deathsPerOneMillion,
    recoveriesPerOneMillion,
    visualData,
    visualLabels
  ) {
    this.id = id
    this.name = name
    this.flag = flag
    this.population = population
    this.cases = cases
    this.deaths = deaths
    this.recoveries = recoveries
    this.casesPerOneMillion = casesPerOneMillion
    this.deathsPerOneMillion = deathsPerOneMillion
    this.recoveriesPerOneMillion = recoveriesPerOneMillion
    this.visualData = visualData
    this.visualLabels = visualLabels
  }
}
