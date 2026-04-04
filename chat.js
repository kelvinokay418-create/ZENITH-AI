import { promptChat } from "./prompt.js";
import { perguntarIa } from "./ai.js";

let historico = [];
let dotsInterval;

// 🔍 Decide se usa histórico
function usarHistorico(mensagem) {
  const gatilhos = ["continua", "explique melhor", "detalha", "não entendi"];
  return gatilhos.some(p => mensagem.toLowerCase().includes(p));
}

// ⏳ Loading
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

// 🎯 Evento
document.getElementById('enviar').addEventListener('click', chat);

// 💬 Função principal
async function chat() {
  const input = document.getElementById('mensagem');
  const mensagem = input.value.trim();

  if (!mensagem) return;

  input.value = '';

  const chatBox = document.getElementById("chat");

  // Mostrar mensagem do usuário
  chatBox.innerHTML += `<p class="chatUser">${mensagem}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  startLoading();

  let messages;

  if (usarHistorico(mensagem)) {
    historico.push({
      role: "user",
      content: mensagem
    });

    messages = [
      {
        role: "system",
        content: "Você é ZENITH, um assistente virtual para alunos. Responda de forma didática, clara e como um educador."
      },
      ...historico
    ];
  } else {
    // pergunta nova → limpa contexto
    historico = [];

    historico.push({
      role: "user",
      content: mensagem
    });

    messages = [
      {
        role: "system",
        content: "Você é ZENITH, um assistente virtual para alunos. Responda de forma didática, clara e como um educador."
      },
      {
        role: "user",
        content: mensagem
      }
    ];
  }

  try {
    const resposta = await perguntarIa(messages, "deepseek-chat");

    // Guardar resposta no histórico
    historico.push({
      role: "assistant",
      content: resposta
    });

    // Mostrar resposta
    const divIA = document.createElement("div");
    divIA.className = "chatIA";
    divIA.innerHTML = resposta;
    chatBox.appendChild(divIA);

  } catch (erro) {
    const divErro = document.createElement("div");
    divErro.className = "chatSystem";
    divErro.innerText = "Erro ao comunicar com a IA.";
    chatBox.appendChild(divErro);
  }

  stopLoading();
  chatBox.scrollTop = chatBox.scrollHeight;
}
  document.getElementById('mensagem').value = ''
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p class="chatUser"> ${mensagem || "vazio"}</p>`;
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
stopLoading()
chat.scrollTop = chat.scrollHeight

     } }
