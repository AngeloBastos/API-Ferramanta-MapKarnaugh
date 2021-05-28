import TruthTable from './TruthTable.js'

export default class KarnaughMap {
  constructor(typeMap = 2) {
    let matrixSquqre = this.getMatrixSquare(typeMap)
    let mattixPermutation = this.getMatrixPermutation(typeMap)
    let matrix = this.setCoord(matrixSquqre, mattixPermutation, typeMap)
    let solutionAlgorithm = 'SOP' 
    this.state = {
      squares: matrix,
      typeMap: typeMap,
      permutation: mattixPermutation, 
      typeSol: solutionAlgorithm
    }
  }

  getMatrixPermutation (dimension) {
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

  getMatrixSquare (dimension) {
    let row = dimension
    let col = dimension
    let deep = 2
    let matrix = []

    if (dimension === 3) {
      row = 2
      col = 4
    }
    
    for (let i = 0; i < row; i++) {
      let temporaryMatrix = []
      for (let j = 0; j < col; j++) {
        let temporaryMatrix2 = []
        for (let k = 0; k < deep; k++) {
          temporaryMatrix2[k] = 0
        }
        temporaryMatrix[j] = temporaryMatrix2
      }
      matrix[i] = temporaryMatrix
    }
    return matrix
  }

  setMatrixSquare(value) {
    const squares = this.state.squares
    const typeMap = this.state.typeMap
    let row = typeMap
    let col = typeMap

    if (typeMap === 3) {
      row = 2
      col = 4
    }

    for (let i = 0; i < row; i++)
      for (let j = 0; j < col; j++) {
        squares[i][j][0] = value;
      }
    
    this.reset()
    this.setState({
      squares: squares
    })
  }

  reset () {}

  setTypeMap (value) {
    let matrixSquqre = this.getMatrixSquare(value)
    let matrixPermutation = this.getMatrixPermutation(value)
    let coord = this.setCoord(matrixSquqre, matrixPermutation, value)
    this.reset()
    this.setState({
      typeMap: value,
      squares: coord,
      permutation: matrixPermutation
    })
  }

  setCoord (squares, permutation, dimension) {
    let row = dimension
    let col = dimension

    if (dimension === 3) {
      row = 2
      col = 4
    }

    for (let i = 0; i < col; i++) {
      let l
      if (i === 2) l = 3
      else if (i === 3) l = 2
      else l = i

      for (let j = 0; j < row; j++) {
        let k
        if (j % row === 2) k = 3
        else if (j % row === 3) k = 2
        else k = j
        
        let val = ''
        let tempDim = dimension
        let p = 0

        do {
          val += permutation[i * row + j][p]
          p++
        } while(p < tempDim / 2)

        squares[k][l][1] = val
        val = ''
        p = Math.floor(tempDim / 2)

        if (dimension === 3) {
          tempDim = 2
          p = Math.floor(tempDim / 2 + 1)
        }

        do {
          val += permutation[i * row + j][p]
          p++
        } while(p < tempDim)

        squares[k][l][2] = val
      }
    }
    return squares
  }

  render() {
    const table = document.querySelector('#truthTable')

    table.innerHTML = new TruthTable(
      this.state.squares,
      this.state.typeMap,
      this.state.permutation
    ).render()
    console.log(this.state)
  }
}