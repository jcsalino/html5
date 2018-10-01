const joJogada          = 1
const kenJogada         = 2
const poJogada          = 3
const vencedorMaquina   = 1
const vencedorHumano    = 2
const vencedorEmpate    = 3

var jo                  = document.getElementById('jo')
var ken                 = document.getElementById('ken')
var po                  = document.getElementById('po')
var reinicar            = document.getElementById('reinicar')
var aimacao             = document.getElementById('aimacao')
var placarHumano        = 0
var placarMaquina       = 0
var placarEmpate        = 0
jo.onclick              = function() {
    console.log('clicou no Jo')
    jogar(joJogada)
};
ken.onclick             = function() {
    console.log('clicou no Ken')
    jogar(kenJogada)
};
po.onclick              = function() {
   console.log('clicou no Po')
   jogar(poJogada)
};
reinicar.onclick              = function() {
   location.reload()
};

function jogar(jogada){
   aimacao.innerHTML = '';
   inserirAnimacao(jogada)
   aimacao.classList.remove('displayNone');
   console.log("entrando na comp",jogada)
   filtroJogo(jogada).then(v=>{
      aimacao.classList.add('displayNone')
   })
   
}

async function filtroJogo(jogadaHumano = 1){
   var jogadaMaquina = Math.floor((Math.random()*3)+1)
   var vencedor      = compararJogadas(jogadaHumano,jogadaMaquina)
   console.log("comparando Jogadas")
   console.log(jogadaMaquina)
   console.log("aguardando delay")
   var delay = await delayA(2000)
   inserirAnimacao(jogadaMaquina)
   delay = await delayA(2000)
   console.log("delay concluido")

   if (vencedor == vencedorEmpate){
      placarEmpate++
      console.log("Empate")
      console.log(placarEmpate)
      document.getElementById('placarEmpate').innerHTML = placarEmpate;
      aimacao.innerHTML = '<div style="text-align: center"><h1>EMPATOU<h1/></div>';
      inserirAnimacao(jogadaMaquina)
   }else if(vencedor == vencedorHumano){
      placarHumano++
      console.log("Humano")
      console.log(placarHumano)
      document.getElementById('placarHumano').innerHTML = placarHumano;
      aimacao.innerHTML = '<div style="text-align: center"><h1>GANHOU<h1/></div>';
      inserirAnimacao(jogadaHumano)
   }else{
      placarMaquina++
      console.log("Maquina")
      console.log(placarMaquina)
      document.getElementById('placarMaquina').innerHTML = placarMaquina;
      aimacao.innerHTML = '<div style="text-align: center"><h1>PERDEU<h1/></div>';
      inserirAnimacao(jogadaMaquina)
   }
   delay = await delayA(1000)
   return delay;
}

function delayA(timer){
   console.log("delayFunction")
   return new Promise(resolve => setTimeout(resolve, timer))
}

function compararJogadas(jogadaHumano,jogadaMaquina){
   if(jogadaHumano == jogadaMaquina){
      return vencedorEmpate;
   }else{
      if(   (jogadaHumano == joJogada && jogadaMaquina == poJogada) || 
            (jogadaHumano == kenJogada && jogadaMaquina == joJogada) ||
            (jogadaHumano == poJogada && jogadaMaquina == kenJogada) 
      ){
         return vencedorHumano
      }else{
         return vencedorMaquina
      }
   }
}

function inserirAnimacao(jogada){
   if(jogada == joJogada){
      aimacao.innerHTML += '<div class="animacaoJo"></div>';
   }
   if(jogada == kenJogada){
      aimacao.innerHTML += '<div class="animacaoKen"></div>';
   }
   if(jogada == poJogada){
      aimacao.innerHTML += '<div class="animacaoPo"></div>';
   }
}