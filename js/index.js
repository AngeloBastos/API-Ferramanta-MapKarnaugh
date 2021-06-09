import KarnaughMap from './KarnaughMap.js'

const radio = document.querySelector('.container-typemap')
const kMap = document.querySelector('.k-map')
const truthTable = document.querySelector('#truthTable')

radio.addEventListener('change', (event) => {
  event.preventDefault()
  kMap.innerHTML = ''
  truthTable.innerHTML = ''
  new KarnaughMap(+event.target.value)
})

