import Map from './Map.js'
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
    console.log(this.state)
    this.render()
  }

  setState ({
    squares = this.state.squares,
    typeMap = this.state.typeMap,
    permutation = this.state.permutation,
    typeSol = 'SOP'}) {
    this.state = {
      squares,
      typeMap,
      permutation,
      typeSol
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

  reset () {
    const typeMap = this.state.typeMap
    let row = typeMap
    let col = typeMap
    if (typeMap === 3) {
      row = 2
      col = 4
    }
    // btn disabled

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const cellMap = document
          .querySelector(`[data-cellmap="${ String(i) + j}"]`)
        // cellMap.classList.remove()
        for (let k = 0; k < 10; k++) {
          const cellMap = document
            .querySelector(`[data-cellmap="${ String(i) + j + k}"]`)
          // cellMap.classList.remove()
        }

      }
    }

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

  handleClick(indexRow, indexCol) {
    const squares = this.state.squares
    if (squares[indexRow][indexCol][0] === 'X') {
      squares[indexRow][indexCol][0] = 0
    } else if (squares[indexRow][indexCol][0] === 0) {
      squares[indexRow][indexCol][0] = 1
    } else {
      squares[indexRow][indexCol][0] = 'X'
    }

    this.reset()
    this.setState({
      squares: squares
    })
  }

  algorithm (squares) {
    let dimensionCol, dimensionRow
    const typeMap = this.state.typeMap
    const typeSol = this.state.typeSol
    let valueSol = (typeSol === 'SOP')? 1 : 0
    
    if (typeMap === 4) {
      dimensionCol = dimensionRow = 4
    } else if (typeMap === 3) {
      dimensionCol = 4
      dimensionRow = 2
    } else {
      dimensionCol = dimensionRow = 2
    }

    const groups = new Array(dimensionRow)

    for (let i = 0; i < dimensionRow; i++) {
      groups[i] = new Array(dimensionCol)
      for (let j = 0; j < dimensionCol; j++) {
        groups[i][j] = []
      }
    }

    let index = 0

    for (let i = 0; i < dimensionRow; i++) {
      for (let j = 0; j < dimensionCol; j++) {
        let count = 0

        if (squares[i][j][0] === valueSol) {
          let [tempIndexI, tempIndexJ] = [i, j]

          if (j === dimensionCol - 1) {
            let ok = true
            let countAux = 0

            for (let height = i; height < dimensionRow && ok; height++) {
              if (squares[height][dimensionCol - 1][0] === valueSol && squares[height][0][0] === valueSol) {
                groups[height][0].push(index)
                groups[height][dimensionCol - 1].push(index)
                countAux++
              } else {
                ok = false
              }
            }
            if (countAux > 0) {
              index++
              if (!isPower(2, countAux)) {
                groups[i + countAux - 1][0].pop()
                groups[i + countAux - 1][dimensionCol - 1].pop()
              }
            }
          }
          
          if (i === dimensionRow - 1) {
            let ok = true
            let countAux = 0

            for (let column = j; column < dimensionCol && ok; column++) {
              if (squares[dimensionRow - 1][column][0] === valueSol && squares[0][column][0] === valueSol) {
                groups[dimensionRow - 1][column].push(index)
                groups[0][column].push(index)
                countAux++
              } else {
                ok = false
              }
            }
            if (countAux > 0) {
              index++
              if (!isPower(2, countAux)) {
                groups[dimensionRow - 1][j + countAux - 1].pop()
                groups[0][j + countAux - 1].pop()
              }
            }
          }
          
          do {
            groups[tempIndexJ][tempIndexJ].push(index)
            count++
            tempIndexJ++
          } while (tempIndexJ < dimensionCol && squares[tempIndexI][tempIndexJ][0] === valueSol)
          
          if (!isPower(2, count)) {
            groups[tempIndexI][tempIndexJ - 1].pop()
            count--
          }

          let countVer
          let depth = 100
          let isOk = true

          for (let change = 0; change < count; change++) {
            tempIndexI = i + 1
            tempIndexJ = j + change
            countVer = 1
            
            while (tempIndexI < dimensionRow && countVer < depth) {
              if (squares[tempIndexI][tempIndexJ][0] !== valueSol) {
                if (change !== 0 && countVer !== depth) {
                  let rig  = tempIndexI
                  if (!isPower(2, change)) {
                    if (!isPower(2, countVer)) {
                      rig--
                    }
                    groups[tempIndexI][tempIndexJ].push(index)
                    if (tempIndexI >= depth) {
                      depth = tempIndexI
                    } else {
                      depth--
                    }
                    for (_; rig <= depth; rig++) {
                      for (let col = tempIndexJ - j; col < change; col++) {
                        groups[rig][col].pop()
                      }
                    }
                    isOk = false
                  }
                }
                break
              }
              groups[tempIndexI][tempIndexJ].push(index)
              tempIndexI++
              countVer++
            }

            if (countVer < depth) {
              depth = countVer
            }

            if (!isPower(2, countVer) && isOk) {
              groups[tempIndexI - 1][tempIndexJ].pop()
              depth--
            }
          }
          index++
        }
      }
    }

    console.log("Algorithm:", {groups})
    this.groupUp(squares, $.extend(true, [], groups))
  }

  groupUp (squares, values) {
    const typeMap = this.state.typeMap
    const typeSol = this.state.typeSol
    let valueSol = (typeSol === 'SOP') ? 1 : 0
    let groups = []
    let group1 = []
    let group2 = []
    let object1, object2
    let dimensionCol, dimensionRow

    if (typeMap === 4) {
      dimensionCol = dimensionRow = 4
    } else if (typeMap === 3) {
      dimensionCol = 4
      dimensionRow = 2
    } else {
      dimensionCol = dimensionRow = 2
    }

    if (squares[0][0][0] == valueSol
      && squares[0][dimensionCol - 1][0] === valueSol
      && squares[dimensionRow - 1][0][0] === valueSol
      && squares[dimensionRow - 1][dimensionCol - 1][0] === valueSol) {
        object1 = { row: 0, col: 0 }
        group1.push(object1)
        object1 = { row: 0, col: dimensionCol - 1 }
        group1.push(object1)
        object1 = { row: dimensionRow - 1, col: 0 }
        group1.push(object1)
        object1 = { row: dimensionRow - 1, col: dimensionCol - 1 }
        group1.push(object1)
        groups.push(group1)
        group1 = []
    }

    for (let i = 0; i < dimensionRow; i++) {
      for (let j = 0; j < dimensionCol; j++) {
        if (squares[i][j][0] === valueSol) {
          let index = values[i][j][0]
          let startRow = i
          let startCol = j
          if (j === dimensionCol - 1) {
            while (startRow < dimensionRow
              && values[startRow][j][0] === index
              && values[startRow][0][0] === index) {
                object1 = { row: startRow, col: 0 }
                object2 = { row: startRow, col: j }
                values[startRow][j].shift()
                values[startRow][0].shift()
                group1.push(object1, object2)
                startRow++
            }
            if (group1.length > 0) {
              groups.push(group1)
              group1 = []
              index = values[i][j][0]
            }
            startRow = i
            startCol = j
          }
          if (i === dimensionRow - 1) {
            while (startCol < dimensionCol
              && values[i][startCol][0] === index
              && values[0][startCol][0] === index) {
                object1 = { row: i, col: startCol }
                object2 = { row: 0, col: startCol }
                values[0][startCol].shift()
                values[i][startCol].shift()
                group1.push(object1, object2)
                startCol++
            }
            if (group1.length > 0) {
              group1.sort((a, b) => a.row - b.row)
              groups.push(group1)
              group1 = []
              index = values[i][j][0]
            }
            startRow = i
            startCol = j
          }
          while (startCol < dimensionCol
            && values[startRow][startCol][0] === index) {
              startCol++
          }
          while (startRow < dimensionRow
            && values[startRow][startCol - 1][0] === index) {
              startRow++
          }
          for (let endRow = i; endRow < startRow; endRow++) {
            for (let endCol = j; endCol < startCol; endCol++) {
              object1 = { row: endRow, col: endCol}
              group1.push(object1)
            }
          }
          groups.push(group1)
          startRow = i
          startCol = j
          while (startRow < dimensionRow
            && values[startRow][startCol][0] === index) {
              startRow++
          }
          while (startCol < dimensionCol
            && values[startRow - 1][startCol][0] === index) {
              startCol++
          }
          for (let endRow = i; endRow < startRow; endRow++) {
            for (let endCol = j; endCol < startCol; endCol++) {
              object1 = { row: endRow, col: endCol}
              group2.push(object1)
            }
          }
          let equal = true
          if (group1.length === group2.length) {
            for (let v = 0; v < group1.length && equal; v++) {
              if (group1[v].row !== group2[v].row
                && group1[v].col !== group2[v].col) {
                  equal = false
              }
            }
          } else {
            groups.push(group2)
          }
          if (!equal) {
            groups.push(group2)
          }
          group1 = []
          group2 = []
          for (let k = 0; k < dimensionRow; k++) {
            for (let z = 0; z < dimensionCol; z++) {
              if (values[k][z][0] === index) {
                values[k][z].shift()
              }
            }
          }
        }
      }
    }
    console.log("GroupUp:", {groups})
    this.cleanAlgorithm($.extend(true, [], groups))
  }

  cleanAlgorithm(groups) {
    groups.sort((a, b) => a.length - b.length)
    groups.reverse()
    console.log('cleanAlgorithm:Rev', {groups})

    let temp = $.extend(true, [], groups)
    for (let i = 0; i < temp.length; i++) {
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[i].length < temp[j].length) {
          let aux = i
          while (temp[aux].length < temp[aux + 1].length) {
            let auxTemp = temp[aux]
            temp[aux] = temp[aux + 1]
            temp[aux + 1] = auxTemp
            auxTemp = groups[aux]
            groups[aux] = groups[aux + 1]
            groups[aux + 1] = auxTemp
          }
        }
        for (let k = 0; k < temp[i].length; k++) {
          for (let l = 0; l < temp[j].length; l++) {
            if (temp[i][k].row === temp[j][l].row
              && temp[i][k].col === temp[j][l].col) {
                for (let p = l; p < temp[j].length - 1; p++) {
                 temp[j][p] = temp[j][p + 1]
                }
                delete temp[j][temp[j].length - 1]
                temp[j].length--
            }
          }
        }
      }
    }
    let found, wipedOut, object1, value
    for (let v = 0; v < groups.length; v++) {
      wipedOut = true
      if (temp[v].length > 0) {
        for (let index = 0; index < groups[v].length
          && wipedOut; index++) {
            object1 = groups[v][index]
            found = false
            for (let k = 0; k < groups.length
              && !found; k++) {
                if (v !== k && temp[k] > 0) {
                  value = groups[k].findIndex(object2 =>
                    object1.row === object2.row
                    && object1.col === object2.col)
                  if (value !== -1) {
                    found = true
                  }
                }
            }
            if (found === false) {
              wipedOut = false
            }
        }
      }
      if (wipedOut === true) {
        temp[v] = []
      }
    }
    console.log("CleanAlgorithm:", temp)
    // this.solution(temp, groups)
    // this.drawGroup(temp, groups)
  }

  render() {
    const values = this.state.squares
    const typeMap = this.state.typeMap
    const permutation = this.state.permutation
    const typeSol = this.state.typeSol

    new TruthTable(
      values,
      typeMap,
      permutation
    )

    new Map(
      typeMap,
      values
    )

    const truthTable = document.querySelector('#truthTable')
    const solutionCalc = document.querySelector('[data-solutioncalc]')
    
    truthTable.addEventListener('click', event => {
      if (event.target.attributes['data-celltab']) {
        const valueAttribbute = event.target.attributes[1].nodeValue
        const kMapCell = document
          .querySelector(`div[data-cellmap="${valueAttribbute}"]`)
        if (event.target.textContent === 'X') {
          kMapCell.textContent = event.target.textContent = '0'
        } else if (event.target.textContent === '0') {
         kMapCell.textContent = event.target.textContent = '1'
        } else {
          kMapCell.textContent = event.target.textContent = 'X'
        }
        const [i, j] = valueAttribbute.split('')
        this.handleClick(i, j)
      }
    })

    solutionCalc.addEventListener('click', () => this.algorithm(values))

    console.log(this.state)
  }
}

function isPower(x, y) {
  if (x === 1) {
    return (y === 1);
  }
  let pow = 1;
  while (pow < y) {
    pow *= x;
  }
  return (pow === y);
}