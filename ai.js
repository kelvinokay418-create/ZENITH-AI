export async function perguntarIa(input){
let messages;
if (typeof input === 'string') {
  messages = [
    {role: 'user', content: input}
  ];
}
else {
  messages = input
}
  const resposta = await fetch("https://api.deepseek.com/chat/completions", {

    method: "POST",

    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-8b02f7fdce754dca951af88700c28374"
    },

    body: JSON.stringify({
      model: "deepseek-chat",
      messages: messages
      
    })

  })

  const dados = await resposta.json()
  console.log('Prompt: ',prompt);
  return dados.choices[0].message.content;
}

