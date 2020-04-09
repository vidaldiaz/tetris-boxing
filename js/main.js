const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const friction = 0.8
const keys = []

let p1Selected = 'red'
let p2Selected = 'black'
//let p2Selected

const images = {
  boxerBlackP1: './assets/tetrisboxer_black_p1.png',
  boxerRedP1: './assets/tetrisboxer_red_p1.png',
  boxerBlueP1: './assets/tetrisboxer_blue_p1.png',
  boxerBlackP2: './assets/tetrisboxer_black_p2.png',
  boxerRedP2: './assets/tetrisboxer_red_p2.png',
  boxerBlueP2: './assets/tetrisboxer_blue_p2.png',
}

let p1RedSelected = {
  x: 20,
  y: 20,
  width: 60,
  height: 80,
  attack: 5,
  scope: 150,
  defese: 4,
  healPoints: 60,
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
  defese: 4,
  healPoints: 60,
  speed: 30,
  imageSrc: images.boxerRedP2,
}
let p1BlueSelected = {
  x: 20,
  y: 20,
  width: 70,
  height: 90,
  attack: 8,
  scope: 100,
  defese: 7,
  healPoints: 90,
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
  defese: 7,
  healPoints: 90,
  speed: 20,
  imageSrc: images.boxerBlueP2,
}
let p1BlackSelected = {
  x: 20,
  y: 20,
  width: 80,
  height: 100,
  attack: 15,
  scope: 70,
  defese: 10,
  healPoints: 130,
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
  defese: 10,
  healPoints: 130,
  speed: 10,
  imageSrc: images.boxerBlackP2,
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

let p1Boxer = new BoxerP1(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
if (p1Selected === 'red') {
  p1Boxer.x = p1RedSelected.x
  p1Boxer.y = p1RedSelected.y
  p1Boxer.width = p1RedSelected.width
  p1Boxer.height = p1RedSelected.height
  p1Boxer.attack = p1RedSelected.attack
  p1Boxer.scope = p1RedSelected.scope
  p1Boxer.defense = p1RedSelected.defese
  p1Boxer.healPoints = p1RedSelected.height
  p1Boxer.speed = p1RedSelected.speed
  p1Boxer.boxerImage.src = p1RedSelected.imageSrc
} else if (p1Selected === 'blue') {
  p1Boxer.x = p1BlueSelected.x
  p1Boxer.y = p1BlueSelected.y
  p1Boxer.width = p1BlueSelected.width
  p1Boxer.height = p1BlueSelected.height
  p1Boxer.attack = p1BlueSelected.attack
  p1Boxer.scope = p1BlueSelected.scope
  p1Boxer.defense = p1BlueSelected.defese
  p1Boxer.healPoints = p1BlueSelected.height
  p1Boxer.speed = p1BlueSelected.speed
  p1Boxer.boxerImage.src = p1BlueSelected.imageSrc
} else if (p1Selected === 'black') {
  p1Boxer.x = p1BlackSelected.x
  p1Boxer.y = p1BlackSelected.y
  p1Boxer.width = p1BlackSelected.width
  p1Boxer.height = p1BlackSelected.height
  p1Boxer.attack = p1BlackSelected.attack
  p1Boxer.scope = p1BlackSelected.scope
  p1Boxer.defense = p1BlackSelected.defese
  p1Boxer.healPoints = p1BlackSelected.height
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
  p2Boxer.defense = p2RedSelected.defese
  p2Boxer.healPoints = p2RedSelected.height
  p2Boxer.speed = p2RedSelected.speed
  p2Boxer.boxerImage.src = p2RedSelected.imageSrc
} else if (p2Selected === 'blue') {
  p2Boxer.x = p2BlueSelected.x
  p2Boxer.y = p2BlueSelected.y
  p2Boxer.width = p2BlueSelected.width
  p2Boxer.height = p2BlueSelected.height
  p2Boxer.attack = p2BlueSelected.attack
  p2Boxer.scope = p2BlueSelected.scope
  p2Boxer.defense = p2BlueSelected.defese
  p2Boxer.healPoints = p2BlueSelected.height
  p2Boxer.speed = p2BlueSelected.speed
  p2Boxer.boxerImage.src = p2BlueSelected.imageSrc
} else if (p2Selected === 'black') {
  p2Boxer.x = p2BlackSelected.x
  p2Boxer.y = p2BlackSelected.y
  p2Boxer.width = p2BlackSelected.width
  p2Boxer.height = p2BlackSelected.height
  p2Boxer.attack = p2BlackSelected.attack
  p2Boxer.scope = p2BlackSelected.scope
  p2Boxer.defense = p2BlackSelected.defese
  p2Boxer.healPoints = p2BlackSelected.height
  p2Boxer.speed = p2BlackSelected.speed
  p2Boxer.boxerImage.src = p2BlackSelected.imageSrc
}

//-  -  -  -  -  -  U     P     G     R     A     D     E     -  -  -  -  -  -  -
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawP1Boxer()
  drawP2Boxer()
  moveBoxer1()
  moveBoxer2()
  attackBoxer1()
  attackBoxer2()
  //isPunchingP1Up()
}

setInterval(update, 1000 / 60)

function isRedP1PunchingArmUp() {
  if (
    p1Boxer.x + p1Boxer.width - 10 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 10 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + 10 > p2Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlueP1PunchingArmUp() {
  if (
    p1Boxer.x + p1Boxer.width - 3 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 3 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + 10 > p2Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlackP1PunchingArmUp() {
  if (
    p1Boxer.x + p1Boxer.width - 9 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 9 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + 3 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + 3 + 11 > p2Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isRedP1PunchingArmDown() {
  if (
    p1Boxer.x + p1Boxer.width - 10 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 10 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + p1Boxer.width + 10 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + p1Boxer.width + 10 + 10 > p2Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlueP1PunchingArmDown() {
  if (
    p1Boxer.x + p1Boxer.width - 3 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 3 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + p1Boxer.width + 10 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + p1Boxer.width + 10 + 10 > p2Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlackP1PunchingArmDown() {
  if (
    p1Boxer.x + p1Boxer.width - 11 < p2Boxer.x + p2Boxer.width &&
    p1Boxer.x + p1Boxer.width - 11 + p1Boxer.scope > p2Boxer.x &&
    p1Boxer.y + p1Boxer.width + 6 < p2Boxer.y + p2Boxer.height &&
    p1Boxer.y + p1Boxer.width + 6 + 11 > p2Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
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
      context.fillStyle = '#3EAAF4' //Color Azul
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
      context.fillStyle = '#3EAAF4' //Color Azul
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
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlueP2PunchingArmUp() {
  if (
    p2Boxer.x + 3 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 3 > p1Boxer.x &&
    p2Boxer.y < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + 10 > p1Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlackP2PunchingArmUp() {
  if (
    p2Boxer.x + 10 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 10 > p1Boxer.x &&
    p2Boxer.y + 3 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + 3 + 11 > p1Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isRedP2PunchingArmDown() {
  if (
    p2Boxer.x + 5 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 5 > p1Boxer.x &&
    p2Boxer.y + p2Boxer.height - 10 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + p2Boxer.height - 10 + 10 > p1Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlueP2PunchingArmDown() {
  if (
    p2Boxer.x + 3 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 3 > p1Boxer.x &&
    p2Boxer.y + p2Boxer.height - 10 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + p2Boxer.height - 10 + 10 > p1Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
  }
}

function isBlackP2PunchingArmDown() {
  if (
    p2Boxer.x + 10 - p2Boxer.scope < p1Boxer.x + p1Boxer.width &&
    p2Boxer.x + 10 > p1Boxer.x &&
    p2Boxer.y + p2Boxer.height - 14 < p1Boxer.y + p1Boxer.height &&
    p2Boxer.y + p2Boxer.height - 14 + 11 > p1Boxer.y
  ) {
    console.log(`Esta Pegando`)
  } else {
    console.log(`NO Esta Pegando`)
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
      context.fillStyle = '#3EAAF4'
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
      context.fillStyle = '#3EAAF4'
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
  context.drawImage(p1Boxer.boxerImage, p1Boxer.x, p1Boxer.y, p1Boxer.width, p1Boxer.height)
}

function drawP2Boxer() {
  context.drawImage(p2Boxer.boxerImage, p2Boxer.x, p2Boxer.y, p2Boxer.width, p2Boxer.height)
}

//Eventos
document.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true
})

document.addEventListener('keyup', (e) => {
  keys[e.keyCode] = false
})

// document.addEventListener('keypress', (e) => {
//   keys[e.keyCode] = true
// })
