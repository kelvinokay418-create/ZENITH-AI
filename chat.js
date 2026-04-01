import {promptChat} from "./prompt.js"
import {perguntarIa} from "./ai.js"

let historico = []
document.getElementById('enviar').addEventListener('click', chat)

 async function chat(){
  const mensagem = document.getElementById('mensagem').value
  document.getElementById('mensagem').value = ''
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p class="chatUser"> ${mensagem || "vazio"}</p>`;
  chat.scrollTop = chat.scrollHeight
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
  if (resposta.status === 429) {
  chat.innerHTML = "IA", "Muita gente estudando agora! Aguarde alguns segundos e tente enviar novamente.";
  return;
}

if (!resposta.ok) {
  const divIA = document.createElement('div')
  divIA.className = 'chatSystem'
  divIA.innerHTML += `${resposta} <br><br>`
  chat.appendChild(divIA)
}
chat.scrollTop = chat.scrollHeight

 }
