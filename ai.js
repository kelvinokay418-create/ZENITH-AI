export async function perguntarIa(input, modelo = "deepseek-chat") {
  let messages;

  if (typeof input === 'string') {
    messages = [
      { role: 'user', content: input }
    ];
  } else {
    messages = input;
  }

  const resposta = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer SUA_API_KEY"
    },
    body: JSON.stringify({
      model: modelo,
      messages: messages,
      temperature: 0.5
    })
  });

  const dados = await resposta.json();

  console.log('Messages:', messages);

  return dados.choices[0].message.content;
}
