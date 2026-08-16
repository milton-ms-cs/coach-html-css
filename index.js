(async function(codioIDE, window) {

  const VERSION = "2.5.1";

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

  // Collect .html/.css files via codioIDE.files — context.files only lists
  // files currently OPEN in the editor, and students often ask about their CSS
  // while only the HTML file is open (or the other way around).
  // codioIDE.workspace does NOT exist in the Custom Assistant runtime;
  // codioIDE.files is the supported channel:
  // https://codio.github.io/client/codioIDE.files.html
  async function collectProjectFiles(skipPaths) {
    let out = "";
    const totalBudget = 40000;
    const F = codioIDE.files;
    if (!F || typeof F.getStructure !== "function" || typeof F.getContent !== "function") return out;

    let files = [];
    try {
      files = findProjectFiles(await F.getStructure(), "");
    } catch (e) {
      return out;
    }

    for (const filePath of files) {
      if (out.length >= totalBudget) break;
      if (skipPaths && skipPaths.has(normalizePath(filePath))) continue;

      try {
        const content = await F.getContent(filePath);
        if (typeof content !== "string" || content.length === 0) continue;
        const maxLen = Math.min(15000, totalBudget - out.length);

        if (content.length <= maxLen) {
          out += `File: ${filePath}\n${content}`;
        } else {
          out += `File: ${filePath} (truncated)\n${content.slice(0, maxLen)}\n...(truncated)`;
        }
        out += '\n\n';
      } catch (e) {
        // Silent — skip unreadable files
      }
    }

    return out.trim();
  }

  function normalizePath(p) {
    return String(p).replace(/^\.\//, "").replace(/^\//, "");
  }

  // getStructure() returns a name->value MAP: a file's value is a leaf (Codio
  // uses 1), a directory's value is a nested map — not an array of nodes.
  function findProjectFiles(node, path) {
    let out = [];
    if (!node || typeof node !== "object") return out;

    for (const name in node) {
      if (!Object.prototype.hasOwnProperty.call(node, name)) continue;
      if (name.startsWith(".")) continue;
      const full = path ? `${path}/${name}` : name;
      const value = node[name];

      if (value && typeof value === "object") {
        out = out.concat(findProjectFiles(value, full));
      } else {
        const lower = name.toLowerCase();
        if (lower.endsWith(".html") || lower.endsWith(".css")) {
          out.push(full);
        }
      }
    }
    return out;
  }

  // Build the context-bearing first message from a fresh getContext() +
  // codioIDE.files read. Re-run before every ask() so the coach sees the
  // student's latest edits, not their code as of the button press.
  async function buildContextMessage(initialInput) {
    const context = await codioIDE.coachBot.getContext();

    // Open editor files first, then the rest of the project's .html/.css files
    let filesContent = (context.files && context.files.length > 0)
      ? context.files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n')
      : "";

    const openPaths = new Set((context.files || []).map(f => normalizePath(f.path)));
    const projectFiles = await collectProjectFiles(openPaths);
    if (projectFiles) {
      filesContent += (filesContent ? '\n\n' : '') + projectFiles;
    }

    if (!filesContent) {
      filesContent = "No files available.";
    }

    const guideContent = (context.guidesPage && context.guidesPage.content)
      ? context.guidesPage.content
      : "No guide available.";

    const assignmentName = (context.assignmentData && context.assignmentData.name)
      ? context.assignmentData.name
      : null;

    return `Here are the student's files (current as of their latest question):
<files>
${filesContent}
</files>
Here is the guide content:
<guide>
${guideContent}
</guide>
${assignmentName ? `\nAssignment: ${assignmentName}\n` : ''}
The student says: ${initialInput}`;
  }

  // ============================================================
  // Session log — a hidden, shared workspace file (.coach-log.json) that every
  // coach appends to (one entry per session, tagged with `coach`), summarizing
  // how students use the coaches. Dot-prefixed so it never enters the LLM
  // context. Deliberately records the student's questions: Codio's own course
  // coach-log export logs only the userPrompt field, which is empty for
  // messages-based coaches like these — this file is where the questions live.
  // Sessions are never dropped (always appended). Logging is wrapped so it can
  // never break the coach.
  // ============================================================

  const SESSION_LOG_PATH = ".coach-log.json";
  const COACH_ID = "html-css";
  const MAX_LOGGED_QUESTIONS = 50;

  async function loadSessionHistory() {
    const F = codioIDE.files;
    if (!F || typeof F.getContent !== "function") return [];
    try {
      const parsed = JSON.parse(await F.getContent(SESSION_LOG_PATH));
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  async function saveSessionHistory(history) {
    const F = codioIDE.files;
    if (!F || typeof F.add !== "function") return;
    const text = JSON.stringify(history, null, 2);
    try {
      await F.add(SESSION_LOG_PATH, text);
    } catch (e) {
      // add() rejects when the file exists — delete and re-add
      try {
        if (typeof F.deleteFiles !== "function") return;
        await F.deleteFiles([SESSION_LOG_PATH]);
        await F.add(SESSION_LOG_PATH, text);
      } catch (e2) {
        // Logging must never break the coach
      }
    }
  }

  // Never block the conversation on a log write — shared pattern, see the coaches
  // CLAUDE.md "Session Logging". saveSessionHistory() is a full read-modify-rewrite
  // (deleteFiles + add) of the shared log; awaiting it in the turn loop means a
  // stalled write freezes the coach with no input box. queueSave() serializes
  // writes on a promise chain (overlapping fire-and-forget saves can't corrupt the
  // file) and is called WITHOUT await each turn; only the end-of-session flush is awaited.
  let saveChain = Promise.resolve();
  function queueSave(history) {
    saveChain = saveChain.then(function() { return saveSessionHistory(history); }).catch(function() {});
    return saveChain;
  }


  async function onButtonPress() {
    codioIDE.coachBot.write(
      `HTML/CSS Coach v${VERSION} - Ask me your HTML and CSS questions!`,
      codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT
    );

    let messages = [];

    let initialInput;
    while (true) {
      try {
        initialInput = await codioIDE.coachBot.input("What can I help you with?");
      } catch (e) {
        codioIDE.coachBot.showMenu();
        return;
      }

      if (initialInput === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      break;
    }

    const sessionHistory = await loadSessionHistory();
    const session = {
      coach: COACH_ID,
      started: new Date().toISOString(),
      updated: null,
      ended: null,
      coachVersion: VERSION,
      exchanges: 0,
      questions: []
    };
    sessionHistory.push(session);

    async function recordTurn(question) {
      session.exchanges += 1;
      if (session.questions.length < MAX_LOGGED_QUESTIONS) {
        session.questions.push(String(question).slice(0, 300));
      }
      session.updated = new Date().toISOString();
      queueSave(sessionHistory); // fire-and-forget: never block the input loop on a log write
    }

    await recordTurn(initialInput);

    messages.push({
        "role": "user",
        "content": await buildContextMessage(initialInput)
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

      if (input === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      const trimmedInput = input.trim().toLowerCase();
      if (exitPhrases.includes(trimmedInput)) {
        break;
      }

      await recordTurn(input);

      messages.push({
          "role": "user",
          "content": input
      });

      // Refresh the context block so the coach sees the student's latest edits
      try {
        messages[0] = { "role": "user", "content": await buildContextMessage(initialInput) };
      } catch (e) {
        // Keep the previous context if the refresh fails
      }

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
    
    session.ended = new Date().toISOString();
    await queueSave(sessionHistory); // flush queued writes (safe to await — no input follows)

    codioIDE.coachBot.write("You're welcome! Let me know if you have more questions.");
    codioIDE.coachBot.showMenu();
  }
})(window.codioIDE, window);
