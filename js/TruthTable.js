export default class TruthTable {
  constructor(squares, typeMap, permutation) {
    this.squares = squares
    this.typeMap = typeMap
    this.permutation = permutation
    this.render()
  }
  render() {
    const table = document.querySelector('#truthTable')
    table.innerHTML = `
      ${new TableHead(this.typeMap).render()}
      ${new Permutation(this.typeMap, this.permutation).render()}
    `
    new TableValSelection(this.squares, this.typeMap)
  }
}

class Permutation {
  constructor(typeMap, permutation) {
    this.typeMap = typeMap
    this.permutation = permutation
  }
  renderCols (valuebit) {
    return `<td class="text-body2">${valuebit}</td>`
  }
  renderTableCol (permutation, index) {
    const typeMap = this.typeMap
    let rowCols = []
    for (let i = 0; i < typeMap; i++) {
      rowCols.push(this.renderCols(permutation[index][i]))
    }
    // rowCols.push(this.renderCols(`<button class="btn btn-cell" value="0">0</button>`))
    return rowCols.join('')
  }
  renderTableRow (permutation, index) {
    return `<tr>${this.renderTableCol(permutation, index)}</tr>`
  }
  renderTablePermutation (permutation) {
    const typeMap = this.typeMap
    let tablePermutationHtml = []
    let cell = Math.pow(2, typeMap)
    for (let i = 0; i < cell; i++) {
      tablePermutationHtml.push(this.renderTableRow(permutation, i))
    }
    return tablePermutationHtml.join('')
  }
  render() {
    return this.renderTablePermutation(this.permutation)
  }
}

class TableHead {
  constructor (typeMap) {
    this.typeMap = typeMap
  }
  tableHead (valueHead) {
    return `<th class="text-subtitle2">${valueHead}</th>`
  }
  tableRow () {
    const typeMap = this.typeMap
    const alphabet = ['A','B','C','D']
    let rowColumns = []
    for(let i = 0; i < typeMap; i++) {
      rowColumns.push(this.tableHead(alphabet[i]))
    }
    rowColumns.push(this.tableHead('R'))
    return rowColumns.join('')
  }
  render () {
    return `<thead><tr>${this.tableRow()}</tr></thead>`
  }
}

class TableValSelection {
  constructor (squares, typeMap) {
    this.squares = squares
    this.typeMap = typeMap
    this.renderTableCol()
  }

  renderButton (i, j) {
    return `
      <button
        class="btn btn-cell"
        data-celltab="${"" + i + j}"
      >${this.squares[i][j][0]}</button>`
  }
  renderTableCol () {
    let rolsTable = document.querySelectorAll('#truthTable > tbody > tr')
    let a = []
    let r = this.typeMap
    let c = this.typeMap

    if (this.typeMap === 3) {
      r = 2
      c = 4
    }

    for (let i = 0; i < c; i++) {
      let l
      if (i === 2) {
        l = 3
      } else if (i === 3) {
        l = 2
      } else {
        l = i
      }
      for (let j = 0; j < r; j++) {
        let k
        if (j % r === 2) {
          k = 3
        } else if (j % r === 3) {
          k = 2
        } else {
          k = j
        }
        a.push(this.renderButton(k, l))
      }
    }
    for (let i = 0; i < 2 ** this.typeMap; i++) {
      rolsTable[i].innerHTML += `<td>${a[i]}</td>`
    }
  }
}