// Retorna o Offset do localStorage.
const getOffset = () => {
	return localStorage.getItem('offset');
}

// Retorna os Exercicios do localStorage.
const getExerciciosFeitos = () => {
	return JSON.parse(localStorage.getItem('exerciciosFeitos'));
}

// Retorna os a lista de Exercicios da ultima chamada da API do localStorage.
const getExercicios = () => {
	return JSON.parse(localStorage.getItem('exercicios'));
}

// Salva Offset no localStorage.
const setOffset = (value) => {
	localStorage.setItem('offset', value);
}

// Salva os Exercicio vindos da API no localStorage.
const setExercicios = (value) => {
	localStorage.setItem('exercicios', JSON.stringify(value));
}

// Salva um exercicio concluído no localStorage.
const setExerciciosFeitos = (value) => {
	if (value == null) {
		localStorage.setItem('exerciciosFeitos', JSON.stringify([]));
	}
	else {
		let exercicios = getExerciciosFeitos();
		exercicios.push(value);
		localStorage.setItem('exerciciosFeitos', JSON.stringify(exercicios));
	}
}

// Inicializando o LocalStorage.
if (getOffset() == null) {
	setOffset(0);
}
if (getExerciciosFeitos() == null) {
	setExerciciosFeitos(null);
}
if (getExercicios() == null) {
	setExercicios([]);
}