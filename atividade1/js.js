var palavras = new Array();
palavras[0] = 'kaka';
palavras[1] = 'adrian';
palavras[2] = 'paulo';

var tentativas;
var palavra = palavras[Math.floor(Math.random()*3)];
var dicas = new Array();


function iniciar_jogo(){
   palavra = palavras[Math.floor(Math.random()*3)];
   dicas = new Array();
   tentativas = 6;
   document.getElementById('tentativas').innerHTML = tentativas;
	iniciar();
	// while(tentativas > 0){
	// 	var letra = prompt("Digite uma letra");
	// 	forca(palavra, letra, dicas);
	// }
	// var restart = prompt('Deseja jogar novamente?');
	// 	if(restart == 's'){
	// 		iniciar_jogo();
	// 	}else if(restart == 'n'){
	// 		alert('tchau seu bosta');
	// 	}else {
	// 		alert('resposta invalida');
	// 	}
}

function iniciar(){
   var tam = palavra.length;
   document.getElementById('letras').innerHTML = tam;
      console.log(tam);
      document.getElementById('exibirPalavra').innerHTML = '';
		for (var i = 0; i < tam; i++) {
         document.getElementById('exibirPalavra').innerHTML += '<div class="letra"> </div> ';
         dicas[i] = '_';
      }
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      return;
      // alert('Dica: ' + dicas.join(' ')+ '\n A palavra tem '+tam+' letras');	
}
function forca(letra) {
   if(tentativas <= 0){
      var restart = prompt('Deseja jogar novamente?');
      if(restart == 's'){
         iniciar_jogo();
      }else if(restart == 'n'){
         alert('tchau seu bosta');
      }else {
         alert('resposta invalida');
      }
      return;
   }
   if (letra.trim().length == 0 || letra.trim().length > 1){
      alert("invalido");
      return;
   }
   var tam = palavra.length;
   var pos = palavra.indexOf(letra);
   if(pos == -1){
      // alert("Incorreto!");
      tentativas = tentativas - 1;
      document.getElementById('tentativas').innerHTML = tentativas;
   } else{
      while(pos != -1){
         dicas[pos] = letra;
         pos = palavra.indexOf(letra, pos + 1);
      }
      // alert("Acertou!");
      var divLetras = document.getElementById('exibirPalavra');
      var str  = "";
      var tam = dicas.join('').length;
      for (var i = 0; i < tam; i++) {
         if(dicas[i] != '_'){
            str += "<div class='letra'>"+dicas[i]+"</div>";
         }else{
            str += "<div class='letra'></div>";
         }
      }
      divLetras.innerHTML = str;
   }
   if(tentativas < 1){
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      document.getElementById('forca').innerHTML += '<div class="cabeca"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoEsquerdo"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoDireito"></div>';
      document.getElementById('forca').innerHTML += '<div class="tronco"></div>';
      document.getElementById('forca').innerHTML += '<div class="pernaEsquerdo"></div>';
      document.getElementById('forca').innerHTML += '<div class="pernaDireito"></div>';
   }
   else if(tentativas < 2){
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      document.getElementById('forca').innerHTML += '<div class="cabeca"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoEsquerdo"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoDireito"></div>';
      document.getElementById('forca').innerHTML += '<div class="tronco"></div>';
      document.getElementById('forca').innerHTML += '<div class="pernaEsquerdo"></div>';
   }else if(tentativas < 3){
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      document.getElementById('forca').innerHTML += '<div class="cabeca"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoEsquerdo"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoDireito"></div>';
      document.getElementById('forca').innerHTML += '<div class="tronco"></div>';
   }else if (tentativas < 4){
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      document.getElementById('forca').innerHTML += '<div class="cabeca"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoEsquerdo"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoDireito"></div>';
   }else if (tentativas < 5){
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      document.getElementById('forca').innerHTML += '<div class="cabeca"></div>';
      document.getElementById('forca').innerHTML += '<div class="bracoEsquerdo"></div>';
   
   }else if (tentativas < 6){
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
      document.getElementById('forca').innerHTML += '<div class="cabeca"></div>';
   }else{
      document.getElementById('forca').innerHTML = '<div class="forca"></div>';
   }
   if(palavra == dicas.join('')){
      alert('voce ganhou!!');
      tentativas = 0;
      document.getElementById('tentativas').innerHTML = tentativas;
      return;
   }
   if(tentativas <= 0){
      return;
   }
   return;
}

function recebeLetra(letra){
   // alert(letra);
   forca(letra.toLowerCase())
}

function iniciarPalavra(palavra, dicas){
	var tam = palavra.length;
		console.log(tam);
		for (var i = 0; i < tam; i++) {
			dicas[i] = '_';
		}
      // alert('Dica: ' + dicas.join(' ')+ '\n A palavra tem '+tam+' letras');	
   }
   function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }