const key = "PkAJKetq00nFxyY3F8bGiA==uE3dDLK9z9ANWyDN"; //a API em questão necessita de uma chave para a autenticação, você obtem a sua fazendo login no site
const apiUrl = "https://api.api-ninjas.com/v1/exercises";

async function fetchExercises(offset = 0) {
  const response = await fetch(apiUrl + "?type=stretching&offset=" + offset, {
    method: "GET", //o método GET é um método HTTP usado quando precisamos obter dados de um servidor
    headers: { "X-Api-Key": key },
  });

  if (!response.ok) {
    const message = `Erro na solicitação da API: ${response.status}`; //tratamento para caso exista algum erro na solicitação (resposta != 200), caso houver, nos retorna o status da resposta
    throw new Error(message);
  }

  const resultado = await response.json(); //em caso de sucesso, resultado guarda o retorno em formato json.
  return resultado;
}
