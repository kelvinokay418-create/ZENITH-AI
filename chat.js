import {promptChat} from "./prompt.js"
import {perguntarIa} from "./ai.js"

let historico = []
function usarHistorico(mensagem) {
  const gatilhos = ["continua", "explique melhor", "detalha", "não entendi"];

  return gatilhos.some(p => mensagem.toLowerCase().includes(p));
}

const input = document.getElementById('mensagem');
const botao = document.getElementById('enviar');

botao.disabled = true;

input.addEventListener('input', () => {
  botao.disabled = input.value.trim() === '';
});

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
  const input = document.getElementById('mensagem')
  const mensagem = input.value.trim()

  if (!mensagem) return;

  input.value = ''

  document.querySelector('.show').classList.add('apresentacao')

  const chat = document.getElementById("chat");

  const userMsg = document.createElement('p')
  userMsg.className = 'chatUser'
  userMsg.textContent = mensagem
  chat.appendChild(userMsg)

  startLoading()

  const usarHist = usarHistorico(mensagem)

  let messages = usarHist
    ? [{ role: "system", content: "..." }, ...historico, { role: "user", content: mensagem }]
    : [{ role: "system", content: "..." }, { role: "user", content: mensagem }]

  const resposta = await perguntarIa(messages, "deepseek-chat")

  historico.push({ role: 'user', content: mensagem })
  historico.push({ role: 'assistant', content: resposta })

  const divIA = document.createElement('div')
  divIA.className = 'chatSystem'
  divIA.innerHTML = marked.parse(resposta)

  chat.appendChild(divIA)

  stopLoading()
  chat.scrollTop = chat.scrollHeight
}
