const nomeExercicio = document.getElementById("nome-exercicio");
const dificuldadeExercicio = document.getElementById("dificuldade-exercicio");
const descricaoExercicio = document.getElementById("descricao-exercicio");

let listaExercicios = [];
let exercicioAtual = 0;
let offset = 0;

//função para fazer a solicitação de dados na API
function solicitaExercicios() {
  fetch(
    "https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset, //o offset é usado para a paginação, considerando que a API retorna apenas 10 itens a cada chamada
    {
      method: "GET", //o método GET é um método HTTP usado quando precisamos obter dados de um servidor
      headers: { "X-Api-Key": "YOUR_API_KEY" }, //a API em questão necessita de uma chave para a autenticação, você obtem a sua fazendo login no site
    }
  )
    .then((resposta) => {
      if (!resposta.ok) {
        //tratamento para caso exista algum erro na solicitação (resposta != 200), caso houver, nos retorna o status da resposta
        throw new Error("Erro na solicitação da API: " + resposta.status);
      }
      return resposta.json(); // se a resposta for bem sucedidda (resposta == 200), ele nos retorna os dados em formato JSON
    })
    .then((dados) => {
      //quando os dados JSON são retornados com sucesso, esse .then é responssável por fazer algo com eles, nesse caso, atribuí-los a array listaExercicios
      listaExercicios = dados;
    })
    .catch((error) => {
      // o catch é executado caso haja algum tipo de erro durante a solicitação HTTP ou processamento da resposta, registrando o erro no console
      console.error("Erro ao fazer solicitação: ", error);
    });
}

//função para mostrar os exercícios na tela
function mostraExercicio() {
  //lógica para a paginação. quando a posição atual chegar ao index 9, será carregado mais 10 exercícios e a posição atual será resetada para o index 0
  if (exercicioAtual === 9) {
    offset += 10;
    exercicioAtual = 0;
  }

  nomeExercicio.innerText = listaExercicios[exercicioAtual].name;
  dificuldadeExercicio.innerText = listaExercicios[exercicioAtual].difficulty;
  descricaoExercicio.innerText = listaExercicios[exercicioAtual].instructions;
  exercicioAtual++;
}

function ocultarExercicio() {
  nomeExercicio.innerText = "";
  dificuldadeExercicio.innerText = "";
  descricaoExercicio.innerText = "";
}

solicitaExercicios();
