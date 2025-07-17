// Seleciona todos os elementos com a classe .exercicio (cada exercício da lista)
const elemsExercicio = document.querySelectorAll(".exercicio");

// Seleciona a div principal da tela
const elemTela = document.querySelector(".tela");

// Botão de "voltar" da tela do cronômetro
const elemVoltar = document.querySelector(".voltar");

// Botão de fechar o cronômetro (ícone vermelho)
const elemClose = document.querySelector(".close");

// Botão de iniciar (play)
const elemPlay = document.querySelector(".play");

// Botão de pausar o cronômetro
const elemPause = document.querySelector(".pause");

// Área que exibe o cronômetro
const elemCronometro = document.querySelector(".cronometro");

// Elemento que mostra o horário atual
const elemHorario = document.querySelector(".horario");

// Partes do cronômetro (minuto, segundo e centésimo)
const elemMinuto = document.querySelector(".minuto");
const elemSegundo = document.querySelector(".segundo");
const elemCentesimo = document.querySelector(".centesimo");

// Variável que armazena o tempo em milissegundos
var timer = 0;

// Armazena o ID do setInterval para poder parar depois
var idIntervalo = null;

/* ============ EVENTOS ============ */

// Quando clicar em um exercício, troca a tela para modo cronômetro
elemsExercicio.forEach(function (elemExercicio) {
  elemExercicio.addEventListener("click", function () {
    elemTela.classList.add("tela--cronometro"); // Ativa a tela do cronômetro
  });
});

// Quando clicar em "Voltar", volta para tela inicial e reinicia o cronômetro
elemVoltar.addEventListener("click", function () {
  elemTela.classList.remove("tela--cronometro"); // Sai do modo cronômetro
  clicouClose(); // Reseta o cronômetro
});

// Função que reseta e para o cronômetro
function clicouClose() {
  elemCronometro.classList.remove("iniciou"); // Remove estilo de cronômetro rodando
  clearInterval(idIntervalo); // Para o tempo
  timer = 0; // Zera o tempo
  atualizarCronometro(); // Atualiza a tela com 00:00,00
}

// Quando clicar no botão vermelho de "fechar"
elemClose.addEventListener("click", function () {
  clicouClose();
});

// Função que inicia o cronômetro
function clicouPlay() {
  elemCronometro.classList.add("iniciou"); // Adiciona estilo de cronômetro rodando
  rodarTimer(); // Começa o cronômetro
}

// Clicar no botão de "play"
elemPlay.addEventListener("click", function () {
  clicouPlay();
});

// Função que pausa o cronômetro
function clicouPause() {
  elemCronometro.classList.remove("iniciou"); // Remove estilo de rodando
  clearInterval(idIntervalo); // Para a contagem
}

// Clicar no botão de "pause"
elemPause.addEventListener("click", function () {
  clicouPause();
});

/* ============ RELÓGIO ============ */

// Função que atualiza o horário atual (relógio digital)
function atualizarHorario() {
  const horas = new Date().getHours().toString().padStart(2, "0"); // Horas com 2 dígitos
  const minutos = new Date().getMinutes().toString().padStart(2, "0"); // Minutos com 2 dígitos
  const horario = horas + ":" + minutos;
  elemHorario.innerText = horario; // Exibe no elemento
}

// Atualiza o relógio uma vez no início
atualizarHorario();

// Atualiza o relógio a cada segundo (1000 ms)
setInterval(() => {
  atualizarHorario();
}, 1000);

/* ============ CRONÔMETRO ============ */

// Função que inicia o cronômetro (incrementa a cada 10 ms)
function rodarTimer() {
  idIntervalo = setInterval(() => {
    timer = timer + 10; // Aumenta 10 milissegundos
    atualizarCronometro(); // Atualiza na tela
  }, 10);
}

// Função que transforma o tempo em formato mm:ss,cc e exibe
function atualizarCronometro() {
  const minutos = Math.floor(timer / 60000).toString().padStart(2, "0"); // Minutos
  const segundos = Math.floor((timer % 60000) / 1000).toString().padStart(2, "0"); // Segundos
  const centesimos = Math.floor(((timer % 60000) % 1000) / 10).toString().padStart(2, "0"); // Centésimos

  const tempoCronometro = minutos + ":" + segundos + "," + centesimos;

  // Mostra os valores na tela
  elemMinuto.innerText = minutos;
  elemSegundo.innerText = segundos;
  elemCentesimo.innerText = centesimos;

  // Apenas para teste (pode remover depois)
  console.log(tempoCronometro);
}
