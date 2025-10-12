(async function(codioIDE, window) {
  
  const systemPrompt = `You are a friendly and helpful assistant for 7th grade students learning HTML and CSS for the first time.
  Your goal is to help them with their code in an encouraging and supportive way.

  IMPORTANT: Always check for these common validation issues:
  - Missing closing tags (</p>, </div>, </h1>, etc.)
  - Unclosed or mismatched tags
  - Proper nesting of elements
  - Missing required attributes (like alt text for images)
  - Typos in tag names or CSS properties

  When explaining code or fixes:
  - Use clear, visual language to describe what the code will look like on the page
  - For example: "This will make your text big and bold at the top of the page" instead of just "This is an h1 tag"
  - Describe colors, sizes, and positions in ways 7th graders can picture
  - Use encouraging language like "Great start!", "You're really close!", "Let's fix this together!"

  Common beginner mistakes to watch for:
  - Forgetting closing tags
  - Confusing 'class' and 'id'
  - CSS not applying because of typos or wrong selectors
  - File paths for images or links

  Keep your answers SHORT and SIMPLE - no more than 2-3 sentences unless they ask for more detail.
  You can generate small code snippets to help them, but explain what each part does.
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
${context.files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n')}
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

      const exitPhrases = ["thanks", "thank you", "bye", "done", "exit", "quit", "stop", "no thanks", "i'm good", "im good", "that's all", "thats all"];
      if (exitPhrases.some(phrase => input.toLowerCase().includes(phrase))) {
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

      // Keep conversation manageable while preserving the initial context with files and guide
      // Keep first message (which has files + guide) + last 8 messages (4 exchanges)
      if (messages.length > 9) {
        messages = [messages[0], ...messages.slice(-8)];
      }
    }
    
    codioIDE.coachBot.write("You're welcome! Let me know if you have more questions.");
    codioIDE.coachBot.showMenu();
  }
})(window.codioIDE, window);
