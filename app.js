// var alterandoH1 = document.querySelector('h1');
//alterandoH1.innerHTML = 'Jogo do número Secreto.';

//var paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número inteiro entre 1 e 10.'
var listaDeNumerosSorteados = []
var numeroLimite = 10;
var numeroSecreto = gerarNumeroSecreto();
var tentativas = 1; 

function mudancasBase (tag,texto) {
    var corpo = document.querySelector(tag);
    corpo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    mudancasBase ('h1', 'Jogo do número Secreto.');
mudancasBase('p', 'Escolhao um núemro inteiro entre 1 e 10.');
}
exibirMensagemInicial();


function verificarChute() {
    var chute = document.querySelector('input'). value;

    if (chute == numeroSecreto) {
        mudancasBase('h1', 'Parabéns, você acertou!')
        var palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        var mensagemTentativas = `Parabéns, você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        mudancasBase ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            mudancasBase('p', 'O número secreto é menor');
        } else {
            mudancasBase('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
  }

function gerarNumeroSecreto() {
    var numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);
    var quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroSecreto(); 
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}