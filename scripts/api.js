let exercisesList = [];
let currentExercise = 0;
let offset = 0;

function getExercises() {
  fetch(
    "https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset,
    {
      method: "GET",
      headers: { "X-Api-Key": "YOUR_API_KEY" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na solicitação da API: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      exercisesList = data;
    })
    .catch((error) => {
      console.error("Erro ao fazer solicitação: ", error);
    });
}

function showExercise() {
  if (currentExercise === 9) {
    offset += 10;
    currentExercise = 0;
  }

  console.log("nome " + exercisesList[currentExercise].name);
  console.log("dificuldade " + exercisesList[currentExercise].difficulty);
  console.log("instrucao " + exercisesList[currentExercise].instructions);
  currentExercise++;

  console.log(currentExercise);
}

getExercises();
showExercise();
