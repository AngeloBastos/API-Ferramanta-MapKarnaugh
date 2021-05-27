import TruthTable from './TruthTable.js'

const content = document.querySelector('main')

const typeMap = 3
function getMatrixPermutation(dimension) {
  let col = dimension
  const row = Math.pow(2, dimension)
  let supportingMatrix = []
  for (let i = 0; i < row; i++) {
    let temporaryMatrix = []
    for (let j = 0; j < col; j++) {
      temporaryMatrix[j] = 0
    }
    supportingMatrix[i] = temporaryMatrix 
  }
  for (let i = 0; i < col; i++) {
    let count = (Math.pow(2, dimension) / 2)
    for (let j = 0; j < row; j++) {
      let bit = (j % (count * 2) < count ? 0 : 1)
      supportingMatrix[j][i] = bit
    }
    dimension--
  }
  return supportingMatrix
}

const perm = getMatrixPermutation(typeMap) 

console.log(new TruthTable(1, typeMap, perm).render())
content.innerHTML = new TruthTable(1, typeMap, perm).render()
