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
      content: 'Você é Zenith, uma IA que ensina alinos nos assuntos que eles quiserem (és um professor) de forma didática e atrativa. REGRAS IMPORTANTES:  - Responda APENAS à última pergunta do usuário. - NÃO repita explicações anteriores. - NÃO reexplique assuntos já respondidos, a menos que o usuário peça. - Use o histórico apenas para contexto, não para repetir conteúdo. - Seja direto, claro e objetivo'
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
