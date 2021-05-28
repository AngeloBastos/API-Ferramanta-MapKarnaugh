import KarnaughMap from './KarnaughMap.js'

const radio = document.querySelector('.container-typemap')
const table = document.querySelector('#truthTable')


new KarnaughMap().render()
radio.addEventListener('change', (event) => {
  new KarnaughMap(+event.target.value).render()
})

table.addEventListener('click', event => { // Altera o bit da tabela
  const element = event.target.localName
  if (element === 'button') {
    const btn = event.target
    if (+btn.value === 0) {
      btn.value = 1
      btn.innerText = 1
    } else {
      btn.value = 0
      btn.innerText = 0
    }
  }
})
