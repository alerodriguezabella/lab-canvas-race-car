const canvas = document.querySelector('#canvas')
canvas.style.border = '2px solid grey'
let ctx = canvas.getContext("2d")
let startScreen =  document.querySelector('.game-intro')


let intervalId = 0
let isGameOver = false
let score = 0

// Getting game images
let background = new Image()
background.src = "./images/road.png"
let gameOverImage = new Image()
gameOverImage.src = './images/gameover.png'
let car = new Image()
car.src = "./images/car.png"

// Car
let carX = 250
let carY = 400
let carWidth = 80
let carHeight = 130

// Obstacle cars 
let obCarsArray = []
let numObCars = 3

for(let i = 0; i < numObCars; i++){
  // Getting obCar image
  let obCar = new Image()
  obCar.src = "./images/car.png"
  // obCar random position
  let obCarX = (Math.random() * (canvas.width - 100 - carWidth)) + 50
  let obCarY = -400 * (Math.random())

  // Creating the object objCar with above properties
  let objCar = {
    image: obCar, 
    x: obCarX, 
    y: obCarY
  }
  obCarsArray.push(objCar)
}

// Clicking the 'StartGame' button to start the game
window.onload = () => {
  canvas.style.display = 'none'

  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  // Setting keyboard < & > functionalities
  document.addEventListener('keydown', (event)=>{
    if(event.code === 'ArrowRight' || event.code === 'ArrowLeft'){
      event.preventDefault()
    } 

    // console.log(event) >>> there we can see 'code' and 'ArrowRight'
    if(event.code === 'ArrowRight' && ((carX + carWidth + 50) < canvas.width)){
      carX += 4
    } else if (event.code === 'ArrowLeft' && carX > 50){
      carX -= 4
    }
  })

  function startGame() {
    canvas.style.display = 'block'
    startScreen.style.display = 'none'

    // Drawing the background and the car
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carHeight)
    
    obCarsArray.forEach(element => {
      // Drawing obCar
      ctx.drawImage(element.image, element.x, element.y, carWidth, carHeight)
      // Car movement
      element.y += 2
      if(element.y > canvas.height){
        element.x = (Math.random() * (canvas.width - carWidth - 100 )) + 50
        element.y = -400 * (Math.random())
        score ++
      }
      // Collision with cars
      if(
        carY < (element.y + carHeight) && 
        carX < (element.x + carWidth - 5) && 
        (carX + carWidth) > element.x && 
        (carY + carHeight) > element.y
        ){
        isGameOver = true
      }
    })

    //Score board
    ctx.font = '30px Georgia'
    ctx.fillText(`Score:${score}`, 100, 40)
    intervalId = requestAnimationFrame(startGame)

    if(isGameOver){
      cancelAnimationFrame(intervalId)
      ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height)
    }
  }
};
