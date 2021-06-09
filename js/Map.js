export default class Map {
  constructor (typeMap, squares) {
    this.typeMap = typeMap
    this.squares = squares
    this.render()
  }

  renderSquare (indexRow, indexCol) {
    return `
      <div
        class="btn btn-cell"
        data-cellmap="${"" + indexRow + indexCol}">
        ${this.squares[indexRow][indexCol][0]}  
      </div>
  `
  }

  generateMapRow (indexRow) {
    const typeMap = this.typeMap
    let tempTypeMap = typeMap
    let row = ''
    if (typeMap === 3) {
      tempTypeMap = 4
    }
    for(let j = 0; j < tempTypeMap; j++) {
      row += `<td>${this.renderSquare(indexRow, j)}</td>`
    }
    return row
  }

  renderMapRow (index) {
    return `${this.generateMapRow(index)}`
  }

  /* renderMap () {
    const typeMap = this.typeMap
    let tempTypeMap = typeMap
    let row = ''
    if (typeMap === 3) {
      tempTypeMap = 2
    }
    for(let i = 0; i < tempTypeMap; i++) {
    row += `${this.renderMapRow(i)}`
    }
    return row
  } */

  renderMapHead (check, value) {
    const typeMap = this.typeMap
    if (check) {
      return `
        <th>${value}</th>
      `
    } else {
      let temp = '<th>'
      let alphabet = ['A', 'B', 'C', 'D']
      let flag = false
      for (let i = 0; i < typeMap; i++) {
        if ((typeMap !== 2 && i === 2) || (typeMap === 2 && i === 1)) {
          temp += `<hr>`
          flag = true
        }
        if (!flag) {
          temp += `<span class="top-left">${alphabet[i]}</span>`  
        }
        else {
          temp += `<span class="bottom-right">${alphabet[i]}</span>`
        }
      }
      temp += '</th>'
      return temp
    }
  }

  renderHeader () {
    const typeMap = this.typeMap
    let string = ['00', '01', '11', '10']
    let tempTypeMap = typeMap
    let a = ''

    if (typeMap === 3) {
      tempTypeMap = 4
    }
    if (typeMap === 2) {
      string = ['0','1']
    }
    a += this.renderMapHead(0, '', 'headerSquare')
    for (let i = 0; i < tempTypeMap; i++) {
      a += this.renderMapHead(1, string[i], 'headerSquare')
    }
    return a
  }

  renderMapHeaderRow () {
    return `<thead>${this.renderHeader()}</thead>`
  }

  renderCol () {
    const typeMap = this.typeMap
    let string = ['00', '01', '11', '10']
    let tempTypeMap = typeMap
    let a = ''

    if (typeMap === 2 || typeMap === 3) {
      string = ['0', '1']
      tempTypeMap = 2
    }

    for (let i = 0; i < tempTypeMap; i++) {
      a += `
        <tr>
          ${this.renderMapHead(1, string[i], 'headerSquare')}
          ${this.renderMapRow(i)}
        </tr>
      `
    }
    return a
  }

  renderMapHeaderCol () {
    return `<tbody>${this.renderCol()}</tbody>`
  }
  
  render () {
    const kMapConatiner = document.querySelector('.k-map')
    kMapConatiner.innerHTML = `
      ${this.renderMapHeaderRow()}
      ${this.renderMapHeaderCol()}
    `
  }
}