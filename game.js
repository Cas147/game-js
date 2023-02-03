const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")
const livesElement = document.querySelector("#livesElement")
const currentLevel = document.querySelector('#currentLevel')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const winContainer = document.querySelector('.win-container')
const gameContainer = document.querySelector('.game-container')
const winTime = document.querySelector('#winTime')

let canvasSize
let elmentsSize
let level = 0
let arrayOfBombs = []
let heart = {
  x: undefined,
  y: undefined
}
let lives = 3
const playerPosition = {
  x: undefined,
  y: undefined
}

const giftPosition = {
  x: undefined,
  y: undefined
}
let takeLife = false
let takeRest = false
let rest = {
  x: undefined,
  y: undefined
}
let taked

let timeStart
let timePlayer
let timeInterval

window.addEventListener('load',setCanvasSize)
window.addEventListener('resize', () => {
  playerPosition.x = undefined
  playerPosition.y = undefined
  setCanvasSize()
})

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75
  } else {
    canvasSize = window.innerHeight * 0.75
  }

/*   game.fillRect(0, 0, 100, 100) */
  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elmentsSize = canvasSize / 10

  startGame()
}

function startGame() {
  if (!timeStart) {
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100)

    if (localStorage.getItem("record")) {
      spanRecord.innerHTML = timeFormat(localStorage.getItem("record"))
    } else {
      spanRecord.innerHTML = "00:00:00"
    }

  }

  const map = maps[level]

  if (!map) {
    gameWin()
    return null
  }
  const mapsRows = map.trim().split('\n')
  const mapsRowCols = mapsRows.map(x => x.trim().split(""))

  showLives()
  
  game.font = elmentsSize + "px Verdana"
  game.textAlign = 'end'

  game.clearRect(0,0,canvasSize, canvasSize);
  mapsRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = (col === 'L' && takeLife)  || (col === 'R' && takeRest )? emojis["X"] : emojis[col]
      const posX = elmentsSize * (colIndex + 1)
      const posY = elmentsSize * (rowIndex + 1)

      if (col == 'O') {
        if (playerPosition.x === undefined && playerPosition.y === undefined  && col === "O") {
          playerPosition.x = posX
          playerPosition.y = posY
        }
      } else if (col == 'I') {
        giftPosition.x = posX
        giftPosition.y = posY
      } else if (col === 'X' || (col === 'L' && takeLife)) {
        arrayOfBombs.push([posX, posY])
      } else if (col === 'L' && !takeLife) {
        heart.x = posX
        heart.y = posY
      } else if (col === 'R' && !takeRest) {
        rest.x = posX
        rest.y = posY
      }
      game.fillText(emoji, posX, posY)
    })
  })
  movePlayer()

}

function movePlayer() {
  const isCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2)
  const isCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2)

  const isNewLiveX = heart.x ? heart.x.toFixed(2) == playerPosition.x.toFixed(2) : false
  const isNewLiveY = heart.y ? heart.y.toFixed(2) == playerPosition.y.toFixed(2) : false


  const isRestX = rest.x ? rest.x.toFixed(2) == playerPosition.x.toFixed(2) : false
  const isRestY = rest.y ? rest.y.toFixed(2) == playerPosition.y.toFixed(2) : false

  if (isCollisionX && isCollisionY) {
    level++
    playerPosition.x = undefined
    playerPosition.y = undefined
    arrayOfBombs = []
    takeLife = false
    takeRest = false
    startGame()
  }

  if (isNewLiveX && isNewLiveY && !takeLife) {
    lives++
    takeLife = true
  }

  if (isRestX && isRestY && !takeRest) {
    timeStart += 5000
    takeRest = true
  }

  if (arrayOfBombs.find(bombPosition => bombPosition[0].toFixed(2) == playerPosition.x.toFixed(2) && bombPosition[1].toFixed(2) == playerPosition.y.toFixed(2))){
    lives--
    if (!lives) {
      level = 0
      lives = 3
      takeLife = false
      takeRest = false
      timeStart = undefined
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    arrayOfBombs = []
    startGame()
  }
  heart.x = undefined
  heart.y = undefined
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
}

const movements = {
  ArrowUp: () => {
    if (Math.round(playerPosition.y - elmentsSize) > 0) {
      playerPosition.y -= elmentsSize
      startGame()
    }
  },
  ArrowDown: () => {
    if (Math.round(playerPosition.y + elmentsSize) <= Math.round(canvasSize)) {
      playerPosition.y += elmentsSize
      startGame()
    }
  },
  ArrowRight: () => {
    if (playerPosition.x + elmentsSize < canvasSize) {
      playerPosition.x += elmentsSize
      startGame()
    }
  },
  ArrowLeft: () => {
    if (playerPosition.x - elmentsSize > 0) {
      playerPosition.x -= elmentsSize
      startGame()
    }
 }
}

const  timeFormat = (time_msec) => {
  const time = ~~(time_msec /1000);
  const min = (time / 60) | 0;
  const sec =  time - (min * 60);    
  const msec = ((time_msec / 10) | 0) - (time * 100);
  return min +':'+ ((sec < 10 ? '0' : 0) + sec) + ':' + ((msec < 10 ? '0' : 0) + msec);
}

const gameWin = () => {
  clearInterval(timeInterval)
  if (!localStorage.getItem("record")) {
    localStorage.setItem("record", timePlayer)
    spanRecord.innerHTML = timeFormat(timePlayer)
    winTime.innerHTML = `${timeFormat(timePlayer)} (New record)`
  } else if (localStorage.getItem("record") > timePlayer) {
    localStorage.setItem("record", timePlayer)
    spanRecord.innerHTML = timeFormat(timePlayer)
    winTime.innerHTML = `${timeFormat(timePlayer)} (New record)`
  } else {
    winTime.innerHTML = timeFormat(timePlayer)
  }

  winContainer.style.display = "flex"
  gameContainer.style.display = "none"
}

const showLives = () => {
  livesElement.innerHTML = "";
  livesElement.innerHTML = emojis["HEART"].repeat(lives)
  currentLevel.innerHTML = level + 1
}

const showTime = () => {
  timePlayer = Date.now() - timeStart
  spanTime.innerHTML = timeFormat(timePlayer)
}

document.addEventListener('keydown', (event) => {
  movements[event.key] && movements[event.key]()
});

btnUp.addEventListener('click', movements["ArrowUp"])
btnDown.addEventListener('click', movements["ArrowDown"])
btnLeft.addEventListener('click', movements["ArrowLeft"])
btnRight.addEventListener('click', movements["ArrowRight"])
