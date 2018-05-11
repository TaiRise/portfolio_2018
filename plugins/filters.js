import Vue from 'vue'

Vue.filter('splitSpan', value => {
  let res = '',
    x = 1,
    delay = 0.05
  value = value.toString().split(' ')
  for (let i of value) {
    res += `<span class="word">`
    for (let j of i) {
      let d = (delay * x).toFixed(2)
      res += j === ' ' ? j : `<span style="transition-delay: ${d}s;">${j}</span>`
      x++
    }
    res += `</span> `
  }

  return res
})
