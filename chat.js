import {promptChat} from "./prompt.js"
import {perguntarIa} from "./ai.js"

let historico = []
function usarHistorico(mensagem) {
  const gatilhos = ["continua", "explique melhor", "detalha", "não entendi"];

  return gatilhos.some(p => mensagem.toLowerCase().includes(p));
}
let dotsInterval;

function startLoading() {
  const loading = document.getElementById("loading");
  const dots = document.getElementById("dots");

  loading.classList.remove("hidden");

  let count = 0;

  dotsInterval = setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 400);
}

function stopLoading() {
  const loading = document.getElementById("loading");

  clearInterval(dotsInterval);
  loading.classList.add("hidden");
}
document.getElementById('enviar').addEventListener('click', chat)

 async function chat(){
  const mensagem = document.getElementById('mensagem').value
  usarHistorico(mensagem)
  document.querySelector('.show').classList.add('apresentacao')
  document.getElementById('mensagem').value = ''
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p class="chatUser"> ${mensagem}</p>`;
  startLoading()
  chat.scrollTop = chat.scrollHeight
  
let messages;

if (usarHistorico(mensagem)) {
  historico.push({
  role: 'user',
  content: mensagem
});
  messages = [
    { role: "system", content: "Você é ZENITH um assistente virtual para alunos, responda didaticamente e de forma jovial mas sempre como se fosse de um educador para um aluno. foste criada por um grupo de estudantes do IPIZ(não sai por aí mencionando isso)" },
    ...historico
  ];
} else {
  messages = [
    { role: "system", content: "Você é ZENITH um assistente virtual para alunos, responda didaticamente e de forma jovial mas sempre como se fosse de um educador para um aluno. foste criada por um grupo de estudantes do IPIZ(não sai por aí mencionando isso)" },
    { role: "user", content: mensagem }
  ];
}
  const resposta = await perguntarIa(messages, "deepseek-chat")
  historico.push({
    role: 'assistant',
    content: resposta
  })
  
if (!resposta.ok) {
  const divIA = document.createElement('div')
  divIA.className = 'chatSystem'
  divIA.innerHTML += `${resposta} <br><br>`
  chat.appendChild(divIA)
}
stopLoading()
chat.scrollTop = chat.scrollHeight

}
