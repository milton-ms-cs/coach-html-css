(async function(codioIDE, window) {
  
  const systemPrompt = `You are a friendly and helpful assistant for middle school students learning HTML and CSS. 
  Your goal is to help them with their code. 
  You should be able to identify issues in their HTML and CSS files and provide helpful, short, and easy-to-understand explanations. 
  You can also generate snippets of HTML or CSS code to help them.
  Keep your answers concise and friendly.
  When you are asked for help, you will be provided with the student's code in the <files> tag and the content of the guides in the <guide> tag.
  `;
  
  codioIDE.coachBot.register("htmlCssHelper", "HTML/CSS Helper", onButtonPress);

  async function onButtonPress() {
    console.log("HTML/CSS Helper started");
    const context = await codioIDE.coachBot.getContext();
    console.log("Context:", context);
    
    let messages = [];

    const initialInput = await codioIDE.coachBot.input("What can I help you with?");

    const initialUserPrompt = `Here are the student's files:
<files>
${context.files.join('\n')}
')}
</files>
Here is the guide content:
<guide>
${context.guidesPage.content}
</guide>

The student says: ${initialInput}`;

    messages.push({
        "role": "user", 
        "content": initialUserPrompt
    });

    console.log("Sending to LLM:", messages);
    let result = await codioIDE.coachBot.ask({
      systemPrompt: systemPrompt,
      messages: messages
    }, {preventMenu: true});
    console.log("LLM Response:", result);

    messages.push({"role": "assistant", "content": result.result});
    
    while (true) {
      const input = await codioIDE.coachBot.input("What else can I help you with?");

      if (input.toLowerCase() === "thanks" || input.toLowerCase() === "thank you") {
        break;
      }
      
      messages.push({
          "role": "user", 
          "content": input
      });
  
      console.log("Sending to LLM:", messages);
      result = await codioIDE.coachBot.ask({
        systemPrompt: systemPrompt,
        messages: messages
      }, {preventMenu: true});
      console.log("LLM Response:", result);

      messages.push({"role": "assistant", "content": result.result});

      if (messages.length > 10) {
        messages.splice(0,2);
      }
    }
    
    codioIDE.coachBot.write("You're welcome! Let me know if you have more questions.");
    codioIDE.coachBot.showMenu();
  }
})(window.codioIDE, window);
