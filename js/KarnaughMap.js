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

  setMatrixSquare (value) {
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
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const cellMap = document
          .querySelector(`[data-cellmap="${ String(i) + j}"]`)
        for (let k = 0; k < 10; k++) {
          const cellMap = document
            .querySelector(`[data-cellmap="${ String(i) + j + k}"]`)
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
      if (i === 2) {
        l = 3
      } else if (i === 3) {
        l = 2
      } else {
        l = i
      }
      for (let j = 0; j < row; j++) {
        let k
        if (j % row === 2) {
          k = 3
        } else if (j % row === 3) {
          k = 2
        } else {
          k = j
        }
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

  handleClick (indexRow, indexCol) {
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
    const valueSol = (typeSol === "SOP") ? 1 : 0
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
              if (squares[height][dimensionCol - 1][0] === valueSol
                && squares[height][0][0] === valueSol) {
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
              if (squares[dimensionRow - 1][column][0] === valueSol
                && squares[0][column][0] === valueSol) {
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
            groups[tempIndexI][tempIndexJ].push(index)
            count++;
            tempIndexJ++
          } while (tempIndexJ < dimensionCol
              && squares[tempIndexI][tempIndexJ][0] === valueSol)
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
                  let row = tempIndexI
                  if (!isPower(2, change)) {
                    if (!isPower(2, countVer)) {
                      row--
                    }
                    groups[tempIndexI][tempIndexJ].push(index)
                    if (tempIndexI >= depth) {
                      depth = tempIndexI
                    } else {
                      depth--
                    }
                    while (row <= depth) {
                      for (let col = tempIndexJ - 1; col <= change; col++) {
                        groups[row][col].pop()
                      }
                      row++
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
    console.log("Algorithm:", groups)
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
    this.solution(temp, groups)
  }

  solution (temp, groups) {
    const typeSol = this.state.typeSol 
    let mainMatrix = this.state.squares
    let alphabet = ['A', 'B', 'C', 'D']
    let solution = ''
    let arraySolution = []
    let indexAlpha, indexCoord, indexCoordBinary
    let elementRow, elementCol
    let flag
    let coord
    let ner
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].length > 0) {
        indexAlpha = 0
        elementRow = groups[i][0].row
        elementCol = groups[i][0].col
        ner = 0 
        while (ner < groups[i].length
          && groups[i][ner].row === elementRow) {
            ner++
        }
        indexCoordBinary = 0
        coord = mainMatrix[elementRow][elementCol][1]
        while (indexCoordBinary < coord.length) {
          indexCoord = 1
          flag = true
          while (indexCoord < groups[i].length
            && groups[i][indexCoord].row === elementRow) {
              if (coord.charAt(indexCoordBinary)
                !== mainMatrix[elementRow][groups[i][indexCoord].col][1]
                .charAt(indexCoordBinary)) {
                  flag = false
                  break
              }
              indexCoord++
          }
          if (flag) {
            if (typeSol === 'SOP') {
              if (coord.charAt(indexCoordBinary) === '0') {
                solution += '!' + alphabet[indexAlpha]
              } else {
                solution += alphabet[indexAlpha]
              }
            } else {
              if (coord.charAt(indexCoordBinary) === '0') {
                solution += alphabet[indexAlpha]
              } else {
                solution += '!' + alphabet[indexAlpha]
              }
              solution += '+'
            }
          }
          indexAlpha++
          indexCoordBinary++
        }
        indexCoordBinary = 0
        coord = mainMatrix[elementRow][elementCol][2]
        while (indexCoordBinary < coord.length) {
          indexCoord = ner
          flag = true
          while (indexCoord < groups[i].length
            && groups[i][indexCoord].col === elementCol) {
              if (coord.charAt(indexCoordBinary)
                !== mainMatrix[groups[i][indexCoord].row][elementCol][2]
                .charAt(indexCoordBinary)) {
                  flag = false
                  break
              }
              indexCoord += ner
          }
          if (flag) {
            if (typeSol === 'SOP') {
              if (coord.charAt(indexCoordBinary) === '0') {
                solution += '!' + alphabet[indexAlpha]
              } else {
                solution += alphabet[indexAlpha]
              }
            } else {
              if (coord.charAt(indexCoordBinary) === '0') {
                solution += alphabet[indexAlpha]
              } else {
                solution += '!' + alphabet[indexAlpha]
              }
              solution += '+'
            }
          }
          indexAlpha++
          indexCoordBinary++
        }
        if (typeSol === 'POS') {
          solution = solution.substr(0, solution.length -1)
        }
        arraySolution.push(solution)
        solution = ''
      }
    }
    if (arraySolution[0] === '' || !arraySolution[0]) {
      if (mainMatrix[0][0][0] === 0) {
        arraySolution[0] = '0'
      } else {
        arraySolution[0] = '1'
      }
    }
    console.log("Solution:", arraySolution)
    this.drawSolution(arraySolution)
  }

  drawSolution (arraySolution) {
    const solutionContainer = document.querySelector('[data-solution]')
    const typeSol = this.state.typeSol
    let literalCost = 0
    if (arraySolution[0] === '0' || arraySolution[0] === '1') {
      const div = document.createElement('div')
      div.innerText = arraySolution[0]
      solutionContainer.append(div)
    } else {
      const symbol = typeSol === 'SOP' ? '+' : '.'
      const cls = typeSol === 'SOP' ? 'groupSOP' : 'groupPOS'
      const colors = [
        'red','blue', 'green',
        'orange', '#50C878','lightblue',
        '#CD7F32','#ff6699'
      ]
      for (let i = 0; i < arraySolution.length; i++) {
        const div = document.createElement('div')
        div.setAttribute('class', `${cls}`)
        div.setAttribute('data-solution', i)
        div.setAttribute('style', `border: 1px solid ${colors[i]}`)
        solutionContainer.append(div)
        for (let j =0; j < arraySolution[i].length; j++) {
          if (arraySolution[i][j] !== '!') {
            const span = document.createElement('span')
            span.setAttribute('style', `color: ${colors[i]}`)
            span.innerText = arraySolution[i][j]
            document.querySelector(`[data-solution="${i}"]`).append(span)
          } else {
            const span = document.createElement('span')
            span.setAttribute('style', `text-decoration: overline; color: ${colors[i]}`)
            span.innerText = arraySolution[i][++j]
            document.querySelector(`[data-solution="${i}"]`).append(span)
          }
          if (arraySolution[i][j] !== '+') {
            literalCost++
          }
        }
        if (i !== arraySolution.length - 1) {
          const div = document.createElement('div')
          div.setAttribute('class', 'plus')
          div.innerText = symbol
          solutionContainer.append(div)
        }
      }
    }
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