const nomeExercicio = document.getElementById("nome-exercicio");
const dificuldadeExercicio = document.getElementById("dificuldade-exercicio");
const descricaoExercicio = document.getElementById("descricao-exercicio");
const concluirAlongamento = document.getElementById("finish-botao");
let exercicioAtual = null;
let exercicioCount = 0;

const mostraExercicio = () => {
  const exercicios = carregarExercicios();

  if (exercicios && exercicios.length) {
    const ultimoExercicio = exercicioAtual;
    for (let i = 0; i < exercicios.length; i++) {
      if (!exercicioJaListado(exercicios[i].name)) {
        exercicioCount++;
        exercicioAtual = exercicios[i];
        alteraIndex(i);
        exercicioJaListado(exercicioJaListado(exercicios[i].name));
        nomeExercicio.innerText = exercicioAtual.name;
        dificuldadeExercicio.innerText = exercicioAtual.difficulty;
        descricaoExercicio.innerText = exercicioAtual.instructions;
        salvaExercicioListado();
        break;
      }
    }

    if (ultimoExercicio == exercicioAtual) {
      exercicioCount = 0;
      aumentarOffset();
      setExercicios([]);
      mostraExercicio();
    }
  }
}

const carregarExercicios = () => {
  let exercicios = getExercicios();

  if (exercicios.length === 0) {
    let offset = parseInt(getOffset());

    fetchExercises(offset).then((resultado) => {
      setExercicios(resultado);
      mostraExercicio();
    });
  }
  else {
    return exercicios;
  }
}

const exercicioJaListado = (name) => {
  const exerciciosListados = getExerciciosListados();
  if (exerciciosListados.length === 0) {
    return false;
  } else {
    for (let i = 0; i < exerciciosListados.length; i++) {
      if (exerciciosListados[i] == name) {
        return true;
      }
    }
    return false;
  }
}

const exercicioFoiFeito = (name) => {
  const exerciciosFeitos = getExerciciosFeitos();
  if (exerciciosFeitos.length === 0) {
    return false;
  }
  else {
    for (i = 0; i < exerciciosFeitos.length; i++) {
      if (exerciciosFeitos[i] == name) {
        return true;
      }
    }
    return false;
  }
}

const aumentarOffset = () => {
  let offset = parseInt(getOffset());
  setOffset(offset + 1);
}

const alteraIndex = (i) => {
  setIndex(i);
}

const ocultarExercicio = () => {
  nomeExercicio.innerText = "";
  dificuldadeExercicio.innerText = "";
  descricaoExercicio.innerText = "";
}

const marcarExercicioComoConcluido = () => {
  if (exercicioAtual != null && exercicioAtual.name) {
    if (!exercicioFoiFeito(exercicioAtual.name)) {
      setExerciciosFeitos(exercicioAtual.name);
    }
  }
}

const salvaExercicioListado = () => {
  if (exercicioAtual != null && exercicioAtual.name) {
    if (!exercicioJaListado(exercicioAtual.name)) {
      setExerciciosListados(exercicioAtual.name);
    }
  }
}