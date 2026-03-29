import {perguntarIa} from "./ai.js";
import { promptAula } from "./prompt.js";
document.getElementById('btnGerar').addEventListener('click', gerar);
async function gerar(){
  
  document.querySelector('.processar').classList.add('processando')
  
const tema = document.getElementById("tema").value;
const nivel = document.getElementById("nivel").value
const curso = document.getElementById("curso").value
const input = promptAula(tema, nivel, curso);
const saida = await perguntarIa(input);
document.getElementById("resultado").innerHTML = marked.parse(saida);
MathJax.typeset()
  document.querySelector('.processar').classList.remove('processando')
}
