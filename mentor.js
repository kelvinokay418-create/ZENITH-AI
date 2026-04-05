import {perguntarIa} from '../ai.js';
import {mentorIa} from '../prompt.js';

const add = document.getElementById('addSubjects')

add.addEventListener('click', function (){
  const container = document.getElementById('disciplinas')
  const div = document.createElement('div')
  div.innerHTML = `<input type="text" placeholder="Disciplina" class="disciplina"> 
    <input type='number' placeholder='Nota' class='nota'>`
    div.classList.add('subjects')
  container.appendChild(div)
})
function coleteDados(){
  const disciplinas = document.querySelectorAll('.disciplina')
  const nota = document.querySelectorAll('.nota')
  let resultado = []
  for (var i = 0; i < disciplinas.length; i++) {
    resultado.push({
      nome: disciplinas[i].value,
      nota: nota[i].value
    })
  }
  return resultado;
}

function formatarNotas() {
  const lista = coleteDados();

  return lista.map(d => {
    const original = Number(d.nota);
    const equivalente = (original / 2).toFixed(1);

    return `${d.nome}: ${original} (escala 0–20) [equivalente: ${equivalente}/10]`;
  }).join("\n");
}
const estados = [
  "A analisar dados...",
  "A identificar padrões...",
  "A estruturar plano...",
  "A otimizar estratégia...",
  "A personalizar recomendações..."
];
let intervalo;

function iniciarLoading() {
  const status = document.getElementById("status");
  let i = 0;
  status.classList.add('status')
  intervalo = setInterval(() => {
    status.textContent = estados[i];
    i = (i + 1) % estados.length;
  }, 2000);
}

function pararLoading() {
  clearInterval(intervalo);
  const status = document.getElementById("status");
  status.textContent = '';

  status.classList.remove('status')
}

document.querySelector('.enviar').addEventListener('click', mentor)

async function mentor() {
    
    const name = document.getElementById('nome').value;
    const classe = document.getElementById('classe').value
    const curso = document.getElementById('curso').value
    const meta = document.getElementById('objetivo').value
    const notas = formatarNotas()
     const show = document.querySelector('.answer')
     const aluno ={
      name,
      classe,
      curso,
      meta,
      notas
    }
    iniciarLoading()
    const input = mentorIa(aluno)
   const resposta = await perguntarIa(input, "deepseek-reasoner")
   show.classList.add('show')
   show.innerHTML = marked.parse(resposta)
   show.scrollTop= show.scrollHeight
   pararLoading()
  }
