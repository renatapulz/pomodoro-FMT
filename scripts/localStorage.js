// Retorna o Offset do localStorage.
const getOffset = () => {
	return localStorage.getItem('offset');
}

// Retorna os Exercicios do localStorage.
const getExerciciosFeitos = () => {
	return JSON.parse(localStorage.getItem('exerciciosFeitos'));
}

// Retorna a lista de Exercicios da ultima chamada da API do localStorage.
const getExercicios = () => {
	return JSON.parse(localStorage.getItem('exercicios'));
}

// Retorna a lista de Exercicios já listados.
const getExerciciosListados = () => {
	return JSON.parse(localStorage.getItem('exerciciosListados'));
}

// Retorna o index do último exercício listado.
const getIndex = () => {
	return JSON.parse(localStorage.getItem('index'));
}

// Salva Offset no localStorage.
const setOffset = (value) => {
	localStorage.setItem('offset', value);
}

// Salva os exercícios vindos da API no localStorage.
const setExercicios = (value) => {
	localStorage.setItem('exercicios', JSON.stringify(value));
}

// Salva o exercício como já listado no localStorage.
const setExerciciosListados = (value) => {
	if (value == null) {
		localStorage.setItem('exerciciosListados', JSON.stringify([]));
	}
	else {
		let exercicios = getExerciciosListados();
		exercicios.push(value);
		localStorage.setItem('exerciciosListados', JSON.stringify(exercicios));
	}
}

// Salva um exercício como concluído no localStorage.
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

// Salva o index do último exercício listado vindos da API no localStorage.
const setIndex = (value) => {
	localStorage.setItem('index', JSON.stringify(value));
}

// Inicializa o LocalStorage.
if (getOffset() == null) {
	setOffset(0);
}
if (getIndex() == null) {
	setIndex([]);
}
if (getExerciciosFeitos() == null) {
	setExerciciosFeitos(null);
}
if (getExerciciosListados() == null) {
	setExerciciosListados(null);
}
if (getExercicios() == null) {
	setExercicios([]);
}