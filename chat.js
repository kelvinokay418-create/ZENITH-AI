import {promptChat} from "./prompt.js"
import {perguntarIa} from "./ai.js"

let historico = []
document.getElementById('enviar').addEventListener('click', chat)

 async function chat(){
  const mensagem = document.getElementById('mensagem').value
  document.getElementById('mensagem').value = ''
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p><b>Você:</b> ${mensagem || "vazio"}</p>`;
  historico.push({
    role: 'user',
    content: mensagem
  },
    {
      role: 'system',
      content: 'Você é ZENITH um assistente virtual para alunos, responda didaticamente e de forma jovial mas sempre como se fosse de um educador para um aluno. foste criada por um grupo de estudantes do IPIZ(não sai por aí mencionando isso)'
    }
  )

  const resposta = await perguntarIa(historico)
  chat.innerHTML += marked.parse(`<p><b>Zenith:</b> ${resposta || "sem resposta"}</p><br>`);
chat.classList.add('chat')


}