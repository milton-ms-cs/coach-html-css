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

  What you CAN do:
  - Explain what a validation issue or error means in plain language.
  - Point out specific problems (missing tags, typos, wrong selectors) and suggest fixes.
  - Write small code snippets (3-5 lines) that show how a tag or CSS property works, with a brief explanation.
  - Help them think through layout and styling step by step.

  What you CANNOT do:
  - Write a student's complete page or full CSS file for them.
  - Do their homework for them. If they ask, say: "I can't build your page for you, but let's fix it together! What part are you stuck on?"
  - Answer questions outside of course content.

  ## Diagnosing vs. solving

  There are two very different kinds of help, and you should treat them differently.

  **Diagnosing — be direct and specific. Point right at the problem:**
  - Validation issues: missing or mismatched closing tags, missing required attributes (like alt text), bad nesting.
  - Typos in tag names, attribute names, or CSS property/selector names.
  - File path problems for images, links, or stylesheets.

  For these, just tell them what's wrong and where. They can fix it themselves once they see it.

  **Solving — make THEM do the work:**
  - "How do I make a navigation bar?" / "How do I center this?" / "How do I make my page look like X?" — these are design questions, not bug questions. Don't write the whole block. Explain what property or technique would help and what it does, then have them try it.
  - "Can you write this section for me?" — no. Describe what the HTML/CSS should look like in plain language, one piece at a time.
  - "Make my page look good" — break it into the smallest first step ("Let's start with getting your heading centered. What CSS property controls text alignment?") and only help with that one step.

  Keep your answers SHORT and SIMPLE - no more than 2-3 sentences unless they ask for more detail.
  You can generate small code snippets to help them, but explain what each part does.
  When you are asked for help, you will be provided with the student's code in the <files> tag and the content of the guides in the <guide> tag.
  `;
  
  codioIDE.coachBot.register("htmlCssHelper", "HTML/CSS Coach", onButtonPress);

  async function onButtonPress() {
    const context = await codioIDE.coachBot.getContext();

    let messages = [];

    let initialInput;
    try {
      initialInput = await codioIDE.coachBot.input("What can I help you with?");
    } catch (e) {
      codioIDE.coachBot.showMenu();
      return;
    }

    const filesContent = (context.files && context.files.length > 0)
      ? context.files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n')
      : "No files available.";

    const guideContent = (context.guidesPage && context.guidesPage.content)
      ? context.guidesPage.content
      : "No guide available.";

    const assignmentName = (context.assignmentData && context.assignmentData.name)
      ? context.assignmentData.name
      : null;

    const initialUserPrompt = `Here are the student's files:
<files>
${filesContent}
</files>
Here is the guide content:
<guide>
${guideContent}
</guide>
${assignmentName ? `\nAssignment: ${assignmentName}\n` : ''}
The student says: ${initialInput}`;

    messages.push({
        "role": "user",
        "content": initialUserPrompt
    });

    try {
      codioIDE.coachBot.showThinkingAnimation();
      const result = await codioIDE.coachBot.ask({
        systemPrompt: systemPrompt,
        messages: messages
      }, {preventMenu: true});
      messages.push({"role": "assistant", "content": result.result});
    } catch (e) {
      codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
      messages.pop();
    } finally {
      codioIDE.coachBot.hideThinkingAnimation();
    }

    const exitPhrases = ["thanks", "thank you", "bye", "done", "exit", "quit", "stop", "no thanks", "i'm good", "im good", "that's all", "thats all"];

    while (true) {
      let input;
      try {
        input = await codioIDE.coachBot.input("What else can I help you with? (Say 'thanks' when you're done!)");
      } catch (e) {
        break;
      }

      const trimmedInput = input.trim().toLowerCase();
      if (exitPhrases.includes(trimmedInput)) {
        break;
      }

      messages.push({
          "role": "user",
          "content": input
      });

      try {
        codioIDE.coachBot.showThinkingAnimation();
        const result = await codioIDE.coachBot.ask({
          systemPrompt: systemPrompt,
          messages: messages
        }, {preventMenu: true});
        messages.push({"role": "assistant", "content": result.result});
      } catch (e) {
        codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
        messages.pop();
        continue;
      } finally {
        codioIDE.coachBot.hideThinkingAnimation();
      }

      // Keep first message (which has files + guide) + last 8 messages (4 exchanges)
      while (messages.length > 9) {
        messages.splice(1, 2); // drop the oldest assistant+user pair, keep messages[0] (context) intact
      }
    }
    
    codioIDE.coachBot.write("You're welcome! Let me know if you have more questions.");
    codioIDE.coachBot.showMenu();
  }
})(window.codioIDE, window);
