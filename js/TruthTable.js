export default class TruthTable {
  constructor(cell, typeMap, permutation) {
    this.cell = cell
    this.typeMap = typeMap
    this.permutation = permutation
  }
  render() {
    return `
        ${new TableHead(this.typeMap).render()}
        ${new Permutation(this.typeMap, this.permutation).render()}
  `
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
    rowCols.push(this.renderCols(`<button value="0">0</button>`))
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