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
  const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {

    method: "POST",

    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },

    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messages,
      temperature: 0.7
      
    })

  })

  const dados = await resposta.json()
  console.log('Prompt: ',prompt);
  return dados.choices[0].message.content;
}

