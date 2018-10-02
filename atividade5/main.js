var blockBreaker     = document.getElementById("blockBreaker");
var cotex            = blockBreaker.getContext("2d");
var widthScreen      = window.innerWidth*0.9;
var heightScreen     = window.innerHeight*0.8;
var baseCalculo      = heightScreen;
var x                = widthScreen/2;
var y                = heightScreen-heightScreen*0.079;
var bola             = baseCalculo * 0.0325;
var dx               = 0;
var dy               = 0;
var numLinBlocos     = 3;
var numColBlocos     = 5;
var paddleHeight     = heightScreen * 0.0325;
var paddleWidth      = widthScreen * 0.16;
var paddleX          = (widthScreen-paddleWidth)/2;
var blocoWidth       = widthScreen * 0.16;
var blocoHeight      = heightScreen * 0.065;
var blocoPadding     = heightScreen * 0.0325;
var blocoOffsetTop   = heightScreen * 0.0975;
var blocoOffsetLeft  = widthScreen  * 0.0625;
var leftPressed      = false;
var rightPressed     = false;
var pontos = 0;
var vidas = 3;

var blocos = [];
if(heightScreen > widthScreen){
   baseCalculo    = widthScreen;
   bola           = baseCalculo * 0.0325;
   numColBlocos   = 4;
}
for(var i = 0; i < numLinBlocos; i++) {
  blocos[i] = [];
  for(var j=0; j < numColBlocos; j++) {
    blocos[i][j] = { x: 0, y: 0, status: 1 };
  }
}
function gera_cor(){
   var hexadecimais = '0123456789ABCDEF';
   var cor = '#';
 
   // Pega um número aleatório no array acima
   for (var i = 0; i < 6; i++ ) {
   //E concatena à variável cor
       cor += hexadecimais[Math.floor(Math.random() * 16)];
   }
   return cor;
}
var corHex           = gera_cor();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);
blockBreaker.setAttribute('width',widthScreen)
blockBreaker.setAttribute('height',heightScreen)
console.log(window.widthScreen)
console.log(heightScreen)
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}
function touchMoveHandler(e) {
   var relativeX = e.touches[0].pageX - blockBreaker.offsetLeft;
   if(relativeX > 0 && relativeX < blockBreaker.width) {
     paddleX = relativeX - paddleWidth/2;
   }
 }
function colisao() {
  for(var i = 0; i <numLinBlocos; i++) {
    for(var j = 0; j < numColBlocos; j++) {
      var b = blocos[i][j];
      if(b.status == 1) {
        if(x > b.x && x < b.x+blocoWidth && y > b.y && y < b.y+blocoHeight) {
          dy = -dy;
          b.status = 0;
          pontos++;
          if(pontos == numColBlocos*numLinBlocos) {
            alert("Voce Ganhou!!!!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function desenharBola() {
  cotex.beginPath();
  cotex.arc(x, y, bola, 0, Math.PI*2);
  cotex.fillStyle = corHex;
  cotex.fill();
  cotex.closePath();
}
function drawPaddle() {
  cotex.beginPath();
  cotex.rect(paddleX, blockBreaker.height-paddleHeight, paddleWidth, paddleHeight);
  cotex.fillStyle = corHex;
  cotex.fill();
  cotex.closePath();
}
function desenharBlocos() {
  for(var i = 0; i < numLinBlocos; i++) {
    for(var j = 0; j < numColBlocos; j++) {
      if(blocos[i][j].status == 1) {
        var blocoX = (j*(blocoWidth+blocoPadding))+blocoOffsetLeft;
        var blocoY = (i*(blocoHeight+blocoPadding))+blocoOffsetTop;
        blocos[i][j].x = blocoX;
        blocos[i][j].y = blocoY;
        cotex.beginPath();
        cotex.rect(blocoX, blocoY, blocoWidth, blocoHeight);
        cotex.fillStyle = corHex;
        cotex.fill();
        cotex.closePath();
      }
    }
  }
}
function desenharPontos() {
  cotex.font = Math.floor(baseCalculo*0.043)+"px Arial";
  cotex.fillStyle = corHex;
  cotex.fillText("Pontos: "+pontos, widthScreen*0.0167, heightScreen*0.0527);
}
function desenharVidas() {
  cotex.font = Math.floor(baseCalculo*0.043)+"px Arial";
  cotex.fillStyle = corHex;
  cotex.fillText("Vidas: "+vidas, blockBreaker.width-widthScreen*0.26, heightScreen*0.0527);
}

function desenhar() {
  cotex.clearRect(0, 0, blockBreaker.width, blockBreaker.height);
  desenharBlocos();
  desenharBola();
  drawPaddle();
  desenharPontos();
  desenharVidas();
  colisao();

  if(x + dx > blockBreaker.width-bola || x + dx < bola) {
    dx = -dx;
  }
  if(y + dy < bola) {
    dy = -dy;
  }
  else if(y + dy > blockBreaker.height-bola) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      vidas--;
      if(!vidas) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = blockBreaker.width/2;
        y = blockBreaker.height-heightScreen*0.079;
        dx = heightScreen*0.0079;
        dy = -(heightScreen*0.0079);
        paddleX = (blockBreaker.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < blockBreaker.width-paddleWidth) {
    paddleX += widthScreen*0.0146;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -=  widthScreen*0.0146;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(desenhar);
}

desenhar();
