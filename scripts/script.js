const container = document.querySelector(".container");
const elementoCronometro = document.getElementById("cronometro");
const iniciar = document.getElementById("start-botao");
const parar = document.getElementById("stop-botao");
const textoInicial = document.getElementsByClassName("fontVerdeEscuro")[0];
const textoExtra = document.querySelector(".textos-extras");

let tempoInicialPadrao = 0.05 * 60;
let tempoInicial = tempoInicialPadrao;
let tempoDecorrido = 0;
let intervaloTempo;
let execucao = false;

textoInicial.innerHTML = "Oi, eu sou o <b>POM!</b> Vamos estudar?";
elementoCronometro.innerHTML = "25:00";
textoExtra.style.display = "none";

// Função para iniciar a contagem regressiva
function iniciarContagemRegressiva() {
  if (!execucao) {
    execucao = true;
    if (tempoDecorrido === 0) {
      // Serve pra definir se o usuário está retomando ou iniciando o cronômetro, pra mostrar o tempo corretamente.
      iniciarCronometro(tempoInicial);
    } else {
      iniciarCronometro(tempoDecorrido);
    }
    if (iniciar.textContent === "RETOMAR") {
      iniciar.textContent = "INICIAR";
    }
  }
}

// Função para parar a contagem regressiva
function pararTempo() {
  if (tempoDecorrido != 0) {
    // Não remover. Se não houver esta validação ele começa do início, ao invés de finalizar.
    clearInterval(intervaloTempo);
    execucao = false;
    iniciar.textContent = "RETOMAR";
  }
}

// Função para atualizar o tempo e chamar a função alteraItensNaTela()
function atualizarTempo() {
  tempoDecorrido--;
  if(tempoDecorrido < 0 && textoInicial.innerHTML == "Hora de <b>ALONGAR</b>. Vem comigo!"){
    alert("Parabéns!!! Tarefa concluída!!!")
    
  }
  if (tempoDecorrido < 0) {
    clearInterval(intervaloTempo);
    execucao = false;
    if (tempoInicial === tempoInicialPadrao) {
      tempoInicial = 0.1 * 60;
    } else {
      tempoInicial = tempoInicialPadrao;
    }
    tempoDecorrido = 0;

    alteraItensNaTela();
  } else {
    let minutos = Math.floor(tempoDecorrido / 60);
    let segundos = tempoDecorrido % 60;
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    if (segundos < 10) {
      segundos = "0" + segundos;
    }
    elementoCronometro.textContent = `${minutos}:${segundos}`;
  }
}

// Função que permite alteração das imagens, textos, tempo e cor
function alteraItensNaTela() {
  container.classList.remove("alteracoes-pom-estuda", "alteracoes-pom-malha");

  if (tempoInicial === tempoInicialPadrao) {
    elementoCronometro.innerHTML = "25:00";
    container.classList.add("alteracoes-pom-estuda");
    textoInicial.innerHTML = "Agora é <b>FOCO</b> hein!";
    textoExtra.style.display = "none";

    ocultarExercicio();
  } else {
    elementoCronometro.innerHTML = "5:00";
    container.classList.add("alteracoes-pom-malha");
    textoInicial.innerHTML = "Hora de <b>ALONGAR</b>. Vem comigo!";
    textoExtra.style.display = "flex";
    mostraExercicio();
  }
}

// Função para iniciar o cronômetro
function iniciarCronometro(tempo) {
  clearInterval(intervaloTempo);
  tempoDecorrido = tempo;

  if (intervaloTempo === undefined) {
    //não remover - valida se é a primeira vez pra alterar a classe e chamar a tela do POM estudando
    alteraItensNaTela();
  }
  elementoCronometro.textContent = `${
    tempoDecorrido < 600 ? "0" : ""
  }${Math.floor(tempoDecorrido / 60)}:${tempoDecorrido % 60 < 10 ? "0" : ""}${
    tempoDecorrido % 60
  }`;
  intervaloTempo = setInterval(atualizarTempo, 1000);
}



iniciar.addEventListener("click", iniciarContagemRegressiva);
parar.addEventListener("click", pararTempo);
