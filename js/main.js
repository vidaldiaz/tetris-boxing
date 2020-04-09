const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const friction = 0.8
const keys = []

const images = {
  boxerBlackP1: './assets/tetrisboxer_black_p1.png',
  boxerRedP1: './assets/tetrisboxer_red_p1.png',
  boxerBlueP1: './assets/tetrisboxer_blue_p1.png',
  boxerBlackP2: './assets/tetrisboxer_black_p2.png',
  boxerRedP2: './assets/tetrisboxer_red_p2.png',
  boxerBlueP2: './assets/tetrisboxer_blue_p2.png',
}

class BoxerP1 {
  constructor(x, y, width, height, attack, scope, defese, healPoints, speed, imageSrc) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.attack = attack
    this.scope = scope
    this.defese = defese
    this.healPoints = healPoints
    this.speed = speed
    this.boxerImage = new Image()
    this.boxerImage.src = imageSrc
    this.velX = 0
    this.velY = 0
  }
}

class BoxerP2 {
  constructor(x, y, width, height, attack, scope, defese, healPoints, speed, imageSrc) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.attack = attack
    this.scope = scope
    this.defese = defese
    this.healPoints = healPoints
    this.speed = speed
    this.boxerImage = new Image()
    this.boxerImage.src = imageSrc
    this.armUpArea = 0
    this.armDownArea = 0
    this.velX = 0
    this.velY = 0
  }
}

let p1Boxer = new BoxerP1(20, 20, 60, 80, 8, 'large', 4, 80, 3, images.boxerRedP1)
//let p2Boxer = new BoxerP2(620, 360, 80, 100, 10, 'medium', 8, 100, 3, images.boxerBlackP2)
let p2Boxer = new BoxerP2(620, 360, 70, 90, 12, 'slow', 6, 90, 4, images.boxerBlueP2)

//Funciones Principales
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawP1Boxer(p1Boxer)
  drawP2Boxer(p2Boxer)
  moveBoxer1()
  moveBoxer2()
  attackBoxer1()
  attackBoxer2()
}

setInterval(update, 1000 / 60)

function attackBoxer1() {
  if (keys[84]) {
    p1Boxer.scope = 0
    p1Boxer.scope += 100
    context.fillStyle = '#EA3C63'
    context.fillRect(p1Boxer.x + p1Boxer.width - 10, p1Boxer.y, 10 + 100, 10)
  }

  if (keys[71]) {
    p1Boxer.scope = 0
    p1Boxer.scope += 100
    context.fillStyle = '#EA3C63'
    context.fillRect(
      p1Boxer.x + p1Boxer.width - 10,
      p1Boxer.y + p1Boxer.height - 10,
      10 + p1Boxer.scope,
      10
    )
  }
}

// function attackBoxer2() { //Negro
//   if (keys[79]) {
//     p2Boxer.scope = 0
//     p2Boxer.scope += 200
//     context.fillStyle = 'black'
//     context.fillRect(p2Boxer.x + 10, p2Boxer.y + 3, 10 - p2Boxer.scope, 10)
//   }

//   if (keys[76]) {
//     p2Boxer.scope = 0
//     p2Boxer.scope += 200
//     context.fillStyle = 'black'
//     context.fillRect(p2Boxer.x + 10, p2Boxer.y + p2Boxer.width + 7, 10 - p2Boxer.scope, 10)
//   }
// }

function attackBoxer2() {
  //Azul
  if (keys[79]) {
    p2Boxer.scope = 0
    p2Boxer.scope += 100
    context.fillStyle = '#3EAAF4'
    context.fillRect(p2Boxer.x + 3, p2Boxer.y, 10 - p2Boxer.scope, 10)
  }

  if (keys[76]) {
    p2Boxer.scope = 0
    p2Boxer.scope += 100
    context.fillStyle = '#3EAAF4'
    context.fillRect(p2Boxer.x + 3, p2Boxer.y + p2Boxer.width + 10, 10 - p2Boxer.scope, 10)
  }
}

function moveBoxer1() {
  if (keys[68]) {
    if (p1Boxer.velX < p1Boxer.speed) {
      p1Boxer.velX++
    }
  }

  if (keys[65]) {
    if (p1Boxer.velX > -p1Boxer.speed) {
      p1Boxer.velX--
    }
  }

  if (keys[83]) {
    if (p1Boxer.velY < p1Boxer.speed) {
      p1Boxer.velY++
    }
  }

  if (keys[87]) {
    if (p1Boxer.velY > -p1Boxer.speed) {
      p1Boxer.velY--
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
      p2Boxer.velX++
    }
  }

  if (keys[37]) {
    if (p2Boxer.velX > -p2Boxer.speed) {
      p2Boxer.velX--
    }
  }

  if (keys[40]) {
    if (p2Boxer.velY < p2Boxer.speed) {
      p2Boxer.velY++
    }
  }

  if (keys[38]) {
    if (p2Boxer.velY > -p2Boxer.speed) {
      p2Boxer.velY--
    }
  }

  p2Boxer.x += p2Boxer.velX
  p2Boxer.velX *= friction

  p2Boxer.y += p2Boxer.velY
  p2Boxer.velY *= friction
}

function drawP1Boxer() {
  context.drawImage(p1Boxer.boxerImage, p1Boxer.x, p1Boxer.y, p1Boxer.width, p1Boxer.height)
}

function drawP2Boxer() {
  context.drawImage(p2Boxer.boxerImage, p2Boxer.x, p2Boxer.y, p2Boxer.width, p2Boxer.height)
}

// isTouchingP1Down(x, y, w, h) {
//   return (
//     this.x < pipe.x + pipe.width &&
//     this.x + this.width > pipe.x &&
//     this.y < pipe.y + pipe.height &&
//     this.y + this.height > pipe.y
//   )
// }

//Eventos
document.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true
})

document.addEventListener('keyup', (e) => {
  keys[e.keyCode] = false
})
