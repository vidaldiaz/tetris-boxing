const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

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
  }

  moveUp() {
    this.y -= this.speed
  }
  moveDown() {
    this.y += this.speed
  }
  moveLeft() {
    this.x -= this.speed
  }
  moveRight() {
    this.x += this.speed
  }

  drawArmUp() {
    context.fillRect(this.x + this.width - 10, this.y + 3, 10, 10)
  }
  drawArmDown() {
    context.fillRect(this.x + this.width - 10, this.y + this.height - 12, 10, 10)
  }

  expandUp() {
    this.scope = 0
    this.scope += 100
    context.fillStyle = '#EA3C63'
    context.fillRect(this.x + this.width - 10, this.y + 3, 10 + this.scope, 10)
  }

  expandDown() {
    this.scope = 0
    this.scope += 100
    context.fillStyle = '#EA3C63'
    context.fillRect(this.x + this.width - 10, this.y + this.height - 12, 10 + this.scope, 10)
  }

  // isTouching(x, y, w, h) {
  //   return (
  //     this.x < pipe.x + pipe.width &&
  //     this.x + this.width > pipe.x &&
  //     this.y < pipe.y + pipe.height &&
  //     this.y + this.height > pipe.y
  //   )
  // }
}
//Codigo para Boxer Azul
// class BoxerP2 {
//   constructor(x, y, width, height, attack, scope, defese, healPoints, speed, imageSrc) {
//     this.x = x
//     this.y = y
//     this.width = width
//     this.height = height
//     this.attack = attack
//     this.scope = scope
//     this.defese = defese
//     this.healPoints = healPoints
//     this.speed = speed
//     this.boxerImage = new Image()
//     this.boxerImage.src = imageSrc
//     this.armUpArea = 0
//     this.armDownArea = 0
//   }

//   moveUp() {
//     this.y -= this.speed
//   }
//   moveDown() {
//     this.y += this.speed
//   }
//   moveLeft() {
//     this.x -= this.speed
//   }
//   moveRight() {
//     this.x += this.speed
//   }

//   drawArmUp() {
//     context.fillRect(this.x + 2, this.y + 2, 10, 10)
//   }
//   drawArmDown() {
//     context.fillRect(this.x + 2, this.y + this.width + 10, 10, 10)
//   }

//   expandUp() {
//     this.scope = 0
//     this.scope += 100
//     context.fillStyle = '#3EAAF4'
//     context.fillRect(this.x + 2, this.y + 2, 10 - this.scope, 10)

//     return { x: this.x, y: this.y + 2, w: 10 - this.scope, h: 10 }
//   }

//   expandDown() {
//     this.scope = 0
//     this.scope += 100
//     context.fillStyle = '#3EAAF4'
//     context.fillRect(this.x + 2, this.y + this.width + 10, 10 - this.scope, 10)
//   }
// }

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
  }

  moveUp() {
    this.y -= this.speed
  }
  moveDown() {
    this.y += this.speed
  }
  moveLeft() {
    this.x -= this.speed
  }
  moveRight() {
    this.x += this.speed
  }

  drawArmUp() {
    context.fillRect(this.x + 2, this.y + 4, 10, 10)
  }
  drawArmDown() {
    context.fillRect(this.x + 2, this.y + this.width + 7, 10, 10)
  }

  expandUp() {
    this.scope = 0
    this.scope += 100
    context.fillStyle = 'black'
    context.fillRect(this.x + 10, this.y + 4, 10 - this.scope, 10)

    return { x: this.x, y: this.y + 2, w: 10 - this.scope, h: 10 }
  }

  expandDown() {
    this.scope = 0
    this.scope += 100
    context.fillStyle = 'black'
    context.fillRect(this.x + 10, this.y + this.width + 7, 10 - this.scope, 10)
    return { x: this.x + 10, y: this.y + this.width + 7, w: 10 - this.scope, h: 10 }
  }
}

let p1Boxer = new BoxerP1(20, 20, 60, 80, 8, 'large', 4, 80, 5, images.boxerRedP1)
let p2Boxer = new BoxerP2(620, 360, 80, 100, 10, 'medium', 8, 100, 3, images.boxerBlackP2)
//let p2Boxer = new BoxerP2(620, 360, 70, 90, 12, 'slow', 6, 90, 4, images.boxerBlueP2)

//Funciones Principales
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawP1Boxer(p1Boxer)
  drawP2Boxer(p2Boxer)
  //p1Boxer.drawArmUp()
  //p1Boxer.drawArmDown()
  // p2Boxer.drawArmUp()
  // p2Boxer.drawArmDown()
}

setInterval(update, 1000 / 60)

function drawP1Boxer() {
  context.drawImage(p1Boxer.boxerImage, p1Boxer.x, p1Boxer.y, p1Boxer.width, p1Boxer.height)
}

function drawP2Boxer() {
  context.drawImage(p2Boxer.boxerImage, p2Boxer.x, p2Boxer.y, p2Boxer.width, p2Boxer.height)
}

//Eventos
document.addEventListener('keydown', (e) => {
  keydown = e.keyCode
  //console.log(keydown)
  switch (keydown) {
    case 87: //P1 Up
      return p1Boxer.moveUp()
      break
    case 83: //P1 Down
      return p1Boxer.moveDown()
      break
    case 65: //P1 Left
      return p1Boxer.moveLeft()
      break
    case 68: //P1 Right
      return p1Boxer.moveRight()
      break
    case 84: // P1 Arm Up
      return p1Boxer.expandUp()
      break
    case 71: // P1 Arm Down
      return p1Boxer.expandDown()
      break
    case 38: //P2 Up
      return p2Boxer.moveUp()
      break
    case 40: //P2 Down
      return p2Boxer.moveDown()
      break
    case 37: //P2 Left
      return p2Boxer.moveLeft()
      break
    case 39: //P2 Right
      return p2Boxer.moveRight()
      break
    case 79: // P2 Arm Up
      return p2Boxer.expandUp()
      break
    case 76: // P2 Arm Down
      return p2Boxer.expandDown()
      break
  }
})

// document.addEventListener('keyup', (e) => {
//   keyup = e.keyCode
//   //console.log(keyup)
//   switch (keyup) {
//     // case 84: // P1 Arm Up
//     //   return p1Boxer.expandUp()
//     //   break
//     // case 71: // P1 Arm Down
//     //   return p1Boxer.expandDown()
//     //   break
//     // case 79: // P2 Arm Up
//     //   return p2Boxer.expandUp()
//     //   break
//     case 76: // P2 Arm Down
//       return p2Boxer.returnDown()
//       break
//   }
// })
