import Vue from 'vue'

/**
 * Change format number
 * @name filter.numberFilter
 * @param {number|string} data - number
 * @returns String
 */
Vue.filter('numberFilter', function (data) {
  let result = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return result
})
