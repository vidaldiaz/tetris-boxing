const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let stage = 'startScreen'
const friction = 0.8
const keys = []

let interval
let p1Selected = 'blue'
let p2Selected = 'blue'

let percentageHpP1 = 100
let percentageHpP2 = 100

const images = {
  pressEnterScreen: './assets/pressStartScreen.png',
  screenControls: './assets/screenControls.png',
  selectRedp1: './assets/charSelectRedp1.png',
  selectRedp2: './assets/charSelectRedp2.png',
  selectYellowp1: './assets/charSelectYellowp1.png',
  selectYellowp2: './assets/charSelectYellowp2.png',
  selectBlackp1: './assets/charSelectBlackp1.png',
  selectBlackp2: './assets/charSelectBlackp2.png',
  backgroundRing: './assets/backgroundRing.jpeg',
  boxerBlackP1: './assets/tetrisboxer_black_p1.png',
  boxerRedP1: './assets/tetrisboxer_red_p1.png',
  boxerBlueP1: './assets/tetrisboxer_blue_p1.png',
  boxerBlackP2: './assets/tetrisboxer_black_p2.png',
  boxerRedP2: './assets/tetrisboxer_red_p2.png',
  boxerBlueP2: './assets/tetrisboxer_blue_p2.png',
  hpBar100p1: './assets/hpBar100p1.png',
  hpBar90p1: './assets/hpBar90p1.png',
  hpBar80p1: './assets/hpBar80p1.png',
  hpBar70p1: './assets/hpBar70p1.png',
  hpBar60p1: './assets/hpBar60p1.png',
  hpBar50p1: './assets/hpBar50p1.png',
  hpBar40p1: './assets/hpBar40p1.png',
  hpBar30p1: './assets/hpBar30p1.png',
  hpBar20p1: './assets/hpBar20p1.png',
  hpBar10p1: './assets/hpBar10p1.png',
  hpBar00p1: './assets/hpBar00p1.png',
  hpBar100p2: './assets/hpBar100p2.png',
  hpBar90p2: './assets/hpBar90p2.png',
  hpBar80p2: './assets/hpBar80p2.png',
  hpBar70p2: './assets/hpBar70p2.png',
  hpBar60p2: './assets/hpBar60p2.png',
  hpBar50p2: './assets/hpBar50p2.png',
  hpBar40p2: './assets/hpBar40p2.png',
  hpBar30p2: './assets/hpBar30p2.png',
  hpBar20p2: './assets/hpBar20p2.png',
  hpBar10p2: './assets/hpBar10p2.png',
  hpBar00p2: './assets/hpBar00p2.png',
  p1Win: './assets/p1Win.png',
  p2Win: './assets/p2Win.png',
}

let p1RedSelected = {
  x: 20,
  y: 140,
  width: 60,
  height: 80,
  attack: 5,
  scope: 150,
  defense: 4,
  healPoints: 600,
  speed: 30,
  imageSrc: images.boxerRedP1,
}
let p2RedSelected = {
  x: 620,
  y: 360,
  width: 60,
  height: 80,
  attack: 5,
  scope: 150,
  defense: 4,
  healPoints: 600,
  speed: 30,
  imageSrc: images.boxerRedP2,
}
let p1BlueSelected = {
  x: 20,
  y: 140,
  width: 70,
  height: 90,
  attack: 8,
  scope: 100,
  defense: 7,
  healPoints: 900,
  speed: 15,
  imageSrc: images.boxerBlueP1,
}
let p2BlueSelected = {
  x: 620,
  y: 360,
  width: 70,
  height: 90,
  attack: 8,
  scope: 100,
  defense: 7,
  healPoints: 900,
  speed: 20,
  imageSrc: images.boxerBlueP2,
}
let p1BlackSelected = {
  x: 20,
  y: 140,
  width: 80,
  height: 100,
  attack: 15,
  scope: 70,
  defense: 10,
  healPoints: 1300,
  speed: 10,
  imageSrc: images.boxerBlackP1,
}
let p2BlackSelected = {
  x: 620,
  y: 360,
  width: 80,
  height: 100,
  attack: 15,
  scope: 70,
  defense: 10,
  healPoints: 1300,
  speed: 10,
  imageSrc: images.boxerBlackP2,
}

class BoxerP1 {
  constructor(x, y, width, height, attack, scope, defense, healPoints, speed, imageSrc) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.attack = attack
    this.scope = scope
    this.defense = defense
    this.healPoints = healPoints
    this.remainingHp = healPoints
    this.speed = speed
    this.boxerImage = new Image()
    this.boxerImage.src = imageSrc
    this.velX = 0
    this.velY = 0
  }
}

class BoxerP2 {
  constructor(x, y, width, height, attack, scope, defense, healPoints, speed, imageSrc) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.attack = attack
    this.scope = scope
    this.defense = defense
    this.healPoints = healPoints
    this.remainingHp = healPoints
    this.speed = speed
    this.boxerImage = new Image()
    this.boxerImage.src = imageSrc
    this.armUpArea = 0
    this.armDownArea = 0
    this.velX = 0
    this.velY = 0
  }
}

let p1Boxer = new BoxerP1(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
if (p1Selected === 'red') {
  p1Boxer.x = p1RedSelected.x
  p1Boxer.y = p1RedSelected.y
  p1Boxer.width = p1RedSelected.width
  p1Boxer.height = p1RedSelected.height
  p1Boxer.attack = p1RedSelected.attack
  p1Boxer.scope = p1RedSelected.scope
  p1Boxer.defense = p1RedSelected.defense
  p1Boxer.healPoints = p1RedSelected.healPoints
  p1Boxer.remainingHp = p1RedSelected.healPoints
  p1Boxer.speed = p1RedSelected.speed
  p1Boxer.boxerImage.src = p1RedSelected.imageSrc
} else if (p1Selected === 'blue') {
  p1Boxer.x = p1BlueSelected.x
  p1Boxer.y = p1BlueSelected.y
  p1Boxer.width = p1BlueSelected.width
  p1Boxer.height = p1BlueSelected.height
  p1Boxer.attack = p1BlueSelected.attack
  p1Boxer.scope = p1BlueSelected.scope
  p1Boxer.defense = p1BlueSelected.defense
  p1Boxer.healPoints = p1BlueSelected.healPoints
  p1Boxer.remainingHp = p1BlueSelected.healPoints
  p1Boxer.speed = p1BlueSelected.speed
  p1Boxer.boxerImage.src = p1BlueSelected.imageSrc
} else if (p1Selected === 'black') {
  p1Boxer.x = p1BlackSelected.x
  p1Boxer.y = p1BlackSelected.y
  p1Boxer.width = p1BlackSelected.width
  p1Boxer.height = p1BlackSelected.height
  p1Boxer.attack = p1BlackSelected.attack
  p1Boxer.scope = p1BlackSelected.scope
  p1Boxer.defense = p1BlackSelected.defense
  p1Boxer.healPoints = p1BlackSelected.healPoints
  p1Boxer.remainingHp = p1BlackSelected.healPoints
  p1Boxer.speed = p1BlackSelected.speed
  p1Boxer.boxerImage.src = p1BlackSelected.imageSrc
}

let p2Boxer = new BoxerP2(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
if (p2Selected === 'red') {
  p2Boxer.x = p2RedSelected.x
  p2Boxer.y = p2RedSelected.y
  p2Boxer.width = p2RedSelected.width
  p2Boxer.height = p2RedSelected.height
  p2Boxer.attack = p2RedSelected.attack
  p2Boxer.scope = p2RedSelected.scope
  p2Boxer.defense = p2RedSelected.defense
  p2Boxer.healPoints = p2RedSelected.healPoints
  p2Boxer.remainingHp = p2RedSelected.healPoints
  p2Boxer.speed = p2RedSelected.speed
  p2Boxer.boxerImage.src = p2RedSelected.imageSrc
} else if (p2Selected === 'blue') {
  p2Boxer.x = p2BlueSelected.x
  p2Boxer.y = p2BlueSelected.y
  p2Boxer.width = p2BlueSelected.width
  p2Boxer.height = p2BlueSelected.height
  p2Boxer.attack = p2BlueSelected.attack
  p2Boxer.scope = p2BlueSelected.scope
  p2Boxer.defense = p2BlueSelected.defense
  p2Boxer.healPoints = p2BlueSelected.healPoints
  p2Boxer.remainingHp = p2BlueSelected.healPoints
  p2Boxer.speed = p2BlueSelected.speed
  p2Boxer.boxerImage.src = p2BlueSelected.imageSrc
} else if (p2Selected === 'black') {
  p2Boxer.x = p2BlackSelected.x
  p2Boxer.y = p2BlackSelected.y
  p2Boxer.width = p2BlackSelected.width
  p2Boxer.height = p2BlackSelected.height
  p2Boxer.attack = p2BlackSelected.attack
  p2Boxer.scope = p2BlackSelected.scope
  p2Boxer.defense = p2BlackSelected.defense
  p2Boxer.healPoints = p2BlackSelected.healPoints
  p2Boxer.remainingHp = p2BlackSelected.healPoints
  p2Boxer.speed = p2BlackSelected.speed
  p2Boxer.boxerImage.src = p2BlackSelected.imageSrc
}
startGame()
//-  -  -  -  -  -  U     P     G     R     A     D     E     -  -  -  -  -  -  -
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  if (stage === 'startScreen') {
    drawStartScreen()
  }
  if (stage === 'controls') {
    drawControls()
  }
  if (stage === 'characters1') {
    selectColor1(p1Selected)
  }

  if (stage === 'characters2') {
    selectColor2(p2Selected)
  }
  if (stage === 'game') {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBackgourd()
    drawP1Boxer()
    drawP2Boxer()
    moveBoxer1()
    moveBoxer2()
    attackBoxer1()
    attackBoxer2()
    drawP1HpBar(percentageHpP2)
    drawP2HpBar(percentageHpP1)
    ringLimits()
  }
}

function drawBackgourd() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  const backgroundImg = new Image()
  backgroundImg.src = images.backgroundRing
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
}
function startGame() {
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  clearInterval(interval)
}

function ringLimits() {
  if (p1Boxer.x > canvas.width - p1Boxer.width || p1Boxer.x + p1Boxer.velX < 0) {
    p1Boxer.velX *= -2
  }

  if (p1Boxer.y > canvas.height - p1Boxer.height || p1Boxer.y + p1Boxer.velY < 103) {
    p1Boxer.velY *= -2
  }

  if (p2Boxer.x > canvas.width - p2Boxer.width || p2Boxer.x + p2Boxer.velX < 0) {
    p2Boxer.velX *= -2
  }

  if (p2Boxer.y > canvas.height - p2Boxer.height || p2Boxer.y + p2Boxer.velY < 103) {
    p2Boxer.velY *= -2
  }
}

function drawP1HpBar(remainingHp) {
  if (remainingHp <= 100 && remainingHp >= 90) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar100p1 = new Image()
    hpBar100p1.src = images.hpBar100p1
    context.drawImage(hpBar100p1, 80, 50, 250, 43)
  } else if (remainingHp < 90 && remainingHp >= 80) {
    //     context.clearRect(0, 0, 720, 480)
    const hpBar90p1 = new Image()
    hpBar90p1.src = images.hpBar90p1
    context.drawImage(hpBar90p1, 80, 50, 250, 43)
  } else if (remainingHp < 80 && remainingHp >= 70) {
    //     context.clearRect(0, 0, 720, 480)
    const hpBar80p1 = new Image()
    hpBar80p1.src = images.hpBar80p1
    context.drawImage(hpBar80p1, 80, 50, 250, 43)
  } else if (remainingHp < 70 && remainingHp >= 60) {
    //     context.clearRect(0, 0, 720, 480)
    const hpBar70p1 = new Image()
    hpBar70p1.src = images.hpBar70p1
    context.drawImage(hpBar70p1, 80, 50, 250, 43)
  } else if (remainingHp < 60 && remainingHp >= 50) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar60p1 = new Image()
    hpBar60p1.src = images.hpBar60p1
    context.drawImage(hpBar60p1, 80, 50, 250, 43)
  } else if (remainingHp < 50 && remainingHp >= 40) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar50p1 = new Image()
    hpBar50p1.src = images.hpBar50p1
    context.drawImage(hpBar50p1, 80, 50, 250, 43)
  } else if (remainingHp < 40 && remainingHp >= 30) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar40p1 = new Image()
    hpBar40p1.src = images.hpBar40p1
    context.drawImage(hpBar40p1, 80, 50, 250, 43)
  } else if (remainingHp < 30 && remainingHp >= 20) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar30p1 = new Image()
    hpBar30p1.src = images.hpBar30p1
    context.drawImage(hpBar30p1, 80, 50, 250, 43)
  } else if (remainingHp < 20 && remainingHp >= 10) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar20p1 = new Image()
    hpBar20p1.src = images.hpBar20p1
    context.drawImage(hpBar20p1, 80, 50, 250, 43)
  } else if (remainingHp < 10 && remainingHp > 0) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar10p1 = new Image()
    hpBar10p1.src = images.hpBar10p1
    context.drawImage(hpBar10p1, 80, 50, 250, 43)
  } else if (remainingHp <= 0) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar00p1 = new Image()
    hpBar00p1.src = images.hpBar00p1
    context.drawImage(hpBar00p1, 80, 50, 250, 43)
    setTimeout(function () {
      const p2WinImg = new Image()
      p2WinImg.src = images.p2Win
      context.drawImage(p2WinImg, 110, 160, 500, 100)
      gameOver()
    }, 1000)
  }
}

function drawP2HpBar(remainingHp) {
  if (remainingHp <= 100 && remainingHp >= 90) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar100p2 = new Image()
    hpBar100p2.src = images.hpBar100p2
    context.drawImage(hpBar100p2, 390, 50, 250, 43)
  } else if (remainingHp < 90 && remainingHp >= 80) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar90p2 = new Image()
    hpBar90p2.src = images.hpBar90p2
    context.drawImage(hpBar90p2, 390, 50, 250, 43)
  } else if (remainingHp < 80 && remainingHp >= 70) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar80p2 = new Image()
    hpBar80p2.src = images.hpBar80p2
    context.drawImage(hpBar80p2, 390, 50, 250, 43)
  } else if (remainingHp < 70 && remainingHp >= 60) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar70p2 = new Image()
    hpBar70p2.src = images.hpBar70p2
    context.drawImage(hpBar70p2, 390, 50, 250, 43)
  } else if (remainingHp < 60 && remainingHp >= 50) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar60p2 = new Image()
    hpBar60p2.src = images.hpBar60p2
    context.drawImage(hpBar60p2, 390, 50, 250, 43)
  } else if (remainingHp < 50 && remainingHp >= 40) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar50p2 = new Image()
    hpBar50p2.src = images.hpBar50p2
    context.drawImage(hpBar50p2, 390, 50, 250, 43)
  } else if (remainingHp < 40 && remainingHp >= 30) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar40p2 = new Image()
    hpBar40p2.src = images.hpBar40p2
    context.drawImage(hpBar40p2, 390, 50, 250, 43)
  } else if (remainingHp < 30 && remainingHp >= 20) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar30p2 = new Image()
    hpBar30p2.src = images.hpBar30p2
    context.drawImage(hpBar30p2, 390, 50, 250, 43)
  } else if (remainingHp < 20 && remainingHp >= 10) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar20p2 = new Image()
    hpBar20p2.src = images.hpBar20p2
    context.drawImage(hpBar20p2, 390, 50, 250, 43)
  } else if (remainingHp < 10 && remainingHp > 0) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar10p2 = new Image()
    hpBar10p2.src = images.hpBar10p2
    context.drawImage(hpBar10p2, 390, 50, 250, 43)
  } else if (remainingHp <= 0) {
    //context.clearRect(0, 0, 720, 480)
    const hpBar00p2 = new Image()
    hpBar00p2.src = images.hpBar00p2
    context.drawImage(hpBar00p2, 390, 50, 250, 43)
    setTimeout(function () {
      const p1WinImg = new Image()
      p1WinImg.src = images.p1Win
      context.drawImage(p1WinImg, 110, 160, 500, 100)
      gameOver()
    }, 1000)
  }
}

function calculateDamageP1() {
  p2Boxer.remainingHp = p2Boxer.remainingHp - p1Boxer.attack * (p2Boxer.defense / 10)
  percentageHpP1 = (p2Boxer.remainingHp * 100) / p2Boxer.healPoints
  return percentageHpP1
}

function calculateDamageP2() {
  p1Boxer.remainingHp = p1Boxer.remainingHp - p2Boxer.attack * (p1Boxer.defense / 10)
  percentageHpP2 = (p1Boxer.remainingHp * 100) / p1Boxer.healPoints
  return percentageHpP2
}

function isRedP1PunchingArmUp() {
  if (
    p1Boxer.x + p1Boxer.width - 10 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 10 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + 10 > p2Boxer.y
  ) {
    calculateDamageP1()
  }
}

function isBlueP1PunchingArmUp() {
  if (
    p1Boxer.x + p1Boxer.width - 3 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 3 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + 10 > p2Boxer.y
  ) {
    calculateDamageP1()
  }
}

function isBlackP1PunchingArmUp() {
  if (
    p1Boxer.x + p1Boxer.width - 9 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 9 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + 3 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + 3 + 11 > p2Boxer.y
  ) {
    calculateDamageP1()
  }
}

function isRedP1PunchingArmDown() {
  if (
    p1Boxer.x + p1Boxer.width - 10 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 10 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + p1Boxer.width + 10 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + p1Boxer.width + 10 + 10 > p2Boxer.y
  ) {
    calculateDamageP1()
  }
}

function isBlueP1PunchingArmDown() {
  if (
    p1Boxer.x + p1Boxer.width - 3 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 3 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + p1Boxer.width + 10 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + p1Boxer.width + 10 + 10 > p2Boxer.y
  ) {
    calculateDamageP1()
  }
}

function isBlackP1PunchingArmDown() {
  if (
    p1Boxer.x + p1Boxer.width - 11 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 11 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + p1Boxer.width + 6 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + p1Boxer.width + 6 + 11 > p2Boxer.y
  ) {
    calculateDamageP1()
  }
}

function attackBoxer1() {
  if (keys[84]) {
    //Brazo Arriba P1
    p1Boxer.scope = 0
    if (p1Selected === 'red') {
      p1Boxer.scope += p1RedSelected.scope
      context.fillStyle = '#EA3C63' //Color Rojo
      context.fillRect(p1Boxer.x + p1Boxer.width - 10, p1Boxer.y, p1Boxer.scope, 10)
      isRedP1PunchingArmUp()
    } else if (p1Selected === 'blue') {
      p1Boxer.scope += p1BlueSelected.scope
      context.fillStyle = '#FFEB4F' //Color Azul
      context.fillRect(p1Boxer.x + p1Boxer.width - 3, p1Boxer.y, p1Boxer.scope, 10)
      isBlueP1PunchingArmUp()
    } else if (p1Selected === 'black') {
      p1Boxer.scope += p1BlackSelected.scope
      context.fillStyle = 'black'
      context.fillRect(p1Boxer.x + p1Boxer.width - 9, p1Boxer.y + 3, p1Boxer.scope, 11)
      isBlackP1PunchingArmUp()
    }
  }

  if (keys[71]) {
    //Brazo Abajo P1
    p1Boxer.scope = 0
    if (p1Selected === 'red') {
      p1Boxer.scope += p1RedSelected.scope
      context.fillStyle = '#EA3C63' //Color Rojo
      context.fillRect(
        p1Boxer.x + p1Boxer.width - 10,
        p1Boxer.y + p1Boxer.width + 10,
        p1Boxer.scope,
        10
      )
      isRedP1PunchingArmDown()
    } else if (p1Selected === 'blue') {
      p1Boxer.scope += p1BlueSelected.scope
      context.fillStyle = '#FFEB4F' //Color Azul
      context.fillRect(
        p1Boxer.x + p1Boxer.width - 3,
        p1Boxer.y + p1Boxer.width + 10,
        p1Boxer.scope,
        10
      )
      isBlueP1PunchingArmDown()
    } else if (p1Selected === 'black') {
      p1Boxer.scope += p1BlackSelected.scope
      context.fillStyle = 'black'
      context.fillRect(
        p1Boxer.x + p1Boxer.width - 11,
        p1Boxer.y + p1Boxer.width + 6,
        p1Boxer.scope,
        11
      )
      isBlackP1PunchingArmDown()
    }
  }
}

function isRedP2PunchingArmUp() {
  if (
    p2Boxer.x + 4 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 4 > p1Boxer.x &&
    p2Boxer.y < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + 10 > p1Boxer.y
  ) {
    calculateDamageP2()
  }
}

function isBlueP2PunchingArmUp() {
  if (
    p2Boxer.x + 3 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 3 > p1Boxer.x &&
    p2Boxer.y < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + 10 > p1Boxer.y
  ) {
    calculateDamageP2()
  }
}

function isBlackP2PunchingArmUp() {
  if (
    p2Boxer.x + 10 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 10 > p1Boxer.x &&
    p2Boxer.y + 3 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + 3 + 11 > p1Boxer.y
  ) {
    calculateDamageP2()
  }
}

function isRedP2PunchingArmDown() {
  if (
    p2Boxer.x + 5 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 5 > p1Boxer.x &&
    p2Boxer.y + p2Boxer.height - 10 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + p2Boxer.height - 10 + 10 > p1Boxer.y
  ) {
    calculateDamageP2()
  }
}

function isBlueP2PunchingArmDown() {
  if (
    p2Boxer.x + 3 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 3 > p1Boxer.x &&
    p2Boxer.y + p2Boxer.height - 10 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + p2Boxer.height - 10 + 10 > p1Boxer.y
  ) {
    calculateDamageP2()
  }
}

function isBlackP2PunchingArmDown() {
  if (
    p2Boxer.x + 10 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 10 > p1Boxer.x &&
    p2Boxer.y + p2Boxer.height - 14 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + p2Boxer.height - 14 + 11 > p1Boxer.y
  ) {
    calculateDamageP2()
  }
}

// if (rect1.x < rect2.x + rect2.width &&
// rect1.x + rect1.width > rect2.x &&
// rect1.y < rect2.y + rect2.height &&
// rect1.y + rect1.height > rect2.y) {
//   collision detected!

function attackBoxer2() {
  if (keys[79]) {
    //Brazo Arriba P2
    p2Boxer.scope = 0
    if (p2Selected === 'red') {
      p2Boxer.scope += p2RedSelected.scope
      context.fillStyle = '#EA3C63'
      context.fillRect(p2Boxer.x + 4, p2Boxer.y, -p2Boxer.scope, 10)
      isRedP2PunchingArmUp()
    } else if (p2Selected === 'blue') {
      p2Boxer.scope += p2BlueSelected.scope
      context.fillStyle = '#FFEB4F'
      context.fillRect(p2Boxer.x + 3, p2Boxer.y, -p2Boxer.scope, 10)
      isBlueP2PunchingArmUp()
    } else if (p2Selected === 'black') {
      p2Boxer.scope += p2BlackSelected.scope
      context.fillStyle = 'black'
      context.fillRect(p2Boxer.x + 10, p2Boxer.y + 3, -p2Boxer.scope, 11)
      isBlackP2PunchingArmUp()
    }
  }

  if (keys[76]) {
    //Brazo Abajo P2
    p2Boxer.scope = 0
    if (p2Selected === 'red') {
      p2Boxer.scope += p2RedSelected.scope
      context.fillStyle = '#EA3C63'
      context.fillRect(p2Boxer.x + 5, p2Boxer.y + p2Boxer.height - 10, -p2Boxer.scope, 10)
      isRedP2PunchingArmDown()
    } else if (p2Selected === 'blue') {
      p2Boxer.scope += p2BlueSelected.scope
      context.fillStyle = '#FFEB4F'
      context.fillRect(p2Boxer.x + 3, p2Boxer.y + p2Boxer.height - 10, -p2Boxer.scope, 10)
      isBlueP2PunchingArmDown()
    } else if (p2Selected === 'black') {
      p2Boxer.scope += p2BlackSelected.scope
      context.fillStyle = 'black'
      context.fillRect(p2Boxer.x + 10, p2Boxer.y + p2Boxer.height - 14, -p2Boxer.scope, 11)
      isBlackP2PunchingArmDown()
    }
  }
}

function moveBoxer1() {
  if (keys[68]) {
    if (p1Boxer.velX < p1Boxer.speed) {
      //p1Boxer.velX++
      if (p1Selected === 'red') {
        p1Boxer.velX += 2
      } else if (p1Selected === 'blue') {
        p1Boxer.velX += 1.5
      } else if (p1Selected === 'black') {
        p1Boxer.velX += 0.5
      }
    }
  }

  if (keys[65]) {
    if (p1Boxer.velX > -p1Boxer.speed) {
      //p1Boxer.velX--
      if (p1Selected === 'red') {
        p1Boxer.velX -= 2
      } else if (p1Selected === 'blue') {
        p1Boxer.velX -= 1.5
      } else if (p1Selected === 'black') {
        p1Boxer.velX -= 0.5
      }
    }
  }

  if (keys[83]) {
    if (p1Boxer.velY < p1Boxer.speed) {
      //p1Boxer.velY++
      if (p1Selected === 'red') {
        p1Boxer.velY += 2
      } else if (p1Selected === 'blue') {
        p1Boxer.velY += 1.5
      } else if (p1Selected === 'black') {
        p1Boxer.velY += 0.5
      }
    }
  }

  if (keys[87]) {
    if (p1Boxer.velY > -p1Boxer.speed) {
      //p1Boxer.velY--
      if (p1Selected === 'red') {
        p1Boxer.velY -= 2
      } else if (p1Selected === 'blue') {
        p1Boxer.velY -= 1.5
      } else if (p1Selected === 'black') {
        p1Boxer.velY -= 0.5
      }
    }
  }

  p1Boxer.x += p1Boxer.velX
  p1Boxer.velX *= friction

  p1Boxer.y += p1Boxer.velY
  p1Boxer.velY *= friction
}

function moveBoxer2() {
  if (keys[39]) {
    if (p2Boxer.velX < p2Boxer.speed) {
      //p2Boxer.velX++
      if (p2Selected === 'red') {
        p2Boxer.velX += 2
      } else if (p2Selected === 'blue') {
        p2Boxer.velX += 1.5
      } else if (p2Selected === 'black') {
        p2Boxer.velX += 0.5
      }
    }
  }

  if (keys[37]) {
    if (p2Boxer.velX > -p2Boxer.speed) {
      //p2Boxer.velX--
      if (p2Selected === 'red') {
        p2Boxer.velX -= 2
      } else if (p2Selected === 'blue') {
        p2Boxer.velX -= 1.5
      } else if (p2Selected === 'black') {
        p2Boxer.velX -= 0.5
      }
    }
  }

  if (keys[40]) {
    if (p2Boxer.velY < p2Boxer.speed) {
      //p2Boxer.velY++
      if (p2Selected === 'red') {
        p2Boxer.velY += 2
      } else if (p2Selected === 'blue') {
        p2Boxer.velY += 1.5
      } else if (p2Selected === 'black') {
        p2Boxer.velY += 0.5
      }
    }
  }

  if (keys[38]) {
    if (p2Boxer.velY > -p2Boxer.speed) {
      //p2Boxer.velY--
      if (p2Selected === 'red') {
        p2Boxer.velY -= 2
      } else if (p2Selected === 'blue') {
        p2Boxer.velY -= 1.5
      } else if (p2Selected === 'black') {
        p2Boxer.velY -= 0.5
      }
    }
  }

  p2Boxer.x += p2Boxer.velX
  p2Boxer.velX *= friction

  p2Boxer.y += p2Boxer.velY
  p2Boxer.velY *= friction
}

function drawP1Boxer() {
  if (p1Selected === 'red') {
    p1Boxer.boxerImage.src = images.boxerRedP1
  } else if (p1Selected === 'blue') {
    p1Boxer.boxerImage.src = images.boxerBlueP1
  } else if (p1Selected === 'black') {
    p1Boxer.boxerImage.src = images.boxerBlackP1
  }
  context.drawImage(p1Boxer.boxerImage, p1Boxer.x, p1Boxer.y, p1Boxer.width, p1Boxer.height)
}

function drawP2Boxer() {
  if (p2Selected === 'red') {
    p2Boxer.boxerImage.src = images.boxerRedP2
  } else if (p2Selected === 'blue') {
    p2Boxer.boxerImage.src = images.boxerBlueP2
  } else if (p2Selected === 'black') {
    p2Boxer.boxerImage.src = images.boxerBlackP2
  }
  context.drawImage(p2Boxer.boxerImage, p2Boxer.x, p2Boxer.y, p2Boxer.width, p2Boxer.height)
}

function drawStartScreen() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  const startScreenImage = new Image()
  startScreenImage.src = images.pressEnterScreen
  context.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height)
}

function drawControls() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  const screenControlsImage = new Image()
  screenControlsImage.src = images.screenControls
  context.drawImage(screenControlsImage, 0, 0, canvas.width, canvas.height)
}

function selectColor1(color = p1Selected) {
  if (p1Selected === 'red') {
    const imageRedSelected = new Image()
    imageRedSelected.src = images.selectRedp1
    context.drawImage(imageRedSelected, 0, 0, canvas.width, canvas.height)
  } else if (p1Selected === 'blue') {
    const imageBlueSelected = new Image()
    imageBlueSelected.src = images.selectYellowp1
    context.drawImage(imageBlueSelected, 0, 0, canvas.width, canvas.height)
  } else if (p1Selected === 'black') {
    const imageBlackSelected = new Image()
    imageBlackSelected.src = images.selectBlackp1
    context.drawImage(imageBlackSelected, 0, 0, canvas.width, canvas.height)
  }
}

function selectColor2(color = p2Selected) {
  if (p2Selected === 'red') {
    const imageRedSelected = new Image()
    imageRedSelected.src = images.selectRedp2
    context.drawImage(imageRedSelected, 0, 0, canvas.width, canvas.height)
  } else if (p2Selected === 'blue') {
    const imageBlueSelected = new Image()
    imageBlueSelected.src = images.selectYellowp2
    context.drawImage(imageBlueSelected, 0, 0, canvas.width, canvas.height)
  } else if (p2Selected === 'black') {
    const imageBlackSelected = new Image()
    imageBlackSelected.src = images.selectBlackp2
    context.drawImage(imageBlackSelected, 0, 0, canvas.width, canvas.height)
  }
}

//Eventos
document.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true
  key = e.keyCode
  switch (key) {
    case 13:
      if (stage === 'startScreen') {
        stage = 'controls'
        break
      }
      if (stage === 'controls') {
        stage = 'characters1'
        break
      }
      if (stage === 'characters1') {
        stage = 'characters2'
        break
      }

      if (stage === 'characters2') {
        stage = 'game'
        break
      }

    case 65:
      if (stage === 'characters1') {
        if (p1Selected === 'red') {
          p1Selected = 'black'
        } else if (p1Selected === 'blue') {
          p1Selected = 'red'
        } else if (p1Selected === 'black') {
          p1Selected = 'blue'
        }
      }
      break

    case 68:
      if (stage === 'characters1') {
        if (p1Selected === 'red') {
          p1Selected = 'blue'
        } else if (p1Selected === 'blue') {
          p1Selected = 'black'
        } else if (p1Selected === 'black') {
          p1Selected = 'red'
        }
      }
      break

    case 37:
      if (stage === 'characters2') {
        if (p2Selected === 'red') {
          p2Selected = 'black'
        } else if (p2Selected === 'blue') {
          p2Selected = 'red'
        } else if (p2Selected === 'black') {
          p2Selected = 'blue'
        }
      }
      break

    case 39:
      if (stage === 'characters2') {
        if (p2Selected === 'red') {
          p2Selected = 'blue'
        } else if (p2Selected === 'blue') {
          p2Selected = 'black'
        } else if (p2Selected === 'black') {
          p2Selected = 'red'
        }
      }
      break
  }
})

document.addEventListener('keyup', (e) => {
  keys[e.keyCode] = false
})
