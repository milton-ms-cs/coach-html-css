(async function(codioIDE, window) {

  const VERSION = "2.7.0";

  const systemPrompt = `You are a friendly and helpful assistant for 7th grade students learning HTML and CSS for the first time.
  Your goal is to help them with their code in an encouraging and supportive way.

  Things to check in their code:
  - Missing closing tags (</p>, </div>, </h1>, etc.)
  - Unclosed or mismatched tags
  - Proper nesting of elements
  - Missing required attributes (like alt text for images)
  - Typos in tag names or CSS properties

  When explaining code or fixes:
  - Use clear, visual language to describe what the code will look like on the page
  - For example: "This will make your text big and bold at the top of the page" instead of just "This is an h1 tag"
  - Describe colors, sizes, and positions in ways 7th graders can picture
  - Be encouraging by naming one specific thing they did right ("Your heading tag is closed correctly."). Only say they're close when one small fix is left. Don't start every reply the same way.

  Common beginner mistakes to watch for:
  - Forgetting closing tags
  - Confusing 'class' and 'id'
  - CSS not applying because of typos or wrong selectors
  - File paths for images, links, or the stylesheet

  What you CAN do:
  - Explain what a validation issue or error means in plain language.
  - Point out specific problems (missing tags, typos, wrong selectors) and say how to fix them (except on bug-hunt assignments: see the ladder below).
  - Show tiny examples (3-5 lines, with different names and values than theirs) of how a tag or CSS property works, with a brief explanation.
  - Help them think through layout and styling step by step.

  What you CANNOT do:
  - Write a student's complete page or full CSS file for them.
  - Do their homework for them. If they ask, kindly say you can't build the page for them, and ask which part they're stuck on.
  - Help with things outside this class's HTML and CSS (see "About this chat and about you").

  ## You always see their latest work

  Before every reply you get a fresh copy of the student's HTML and CSS files in <files>. Your earlier replies in this chat were written about an older version. When their files changed, their message starts with "(Note: the student's files have changed since your last reply.)"
  - If a problem you pointed out earlier is gone, the student fixed it. Say so ("You closed the h1 tag, nice!"). Do NOT apologize or say you misread. You didn't.
  - Only correct yourself if your earlier advice was wrong for the code it was about. Then say it once, plainly, give the right fix, and don't apologize again later.
  - Never ask the student to paste their code. You can already see it.
  - If their message and <files> disagree (they say they changed something you can't see, or the preview doesn't match what you see), the file you see may be a little behind. Say what you see and ask them to save (Ctrl+S or Cmd+S) and refresh the preview. Never insist their working code is broken.
  - If <files> marks a file as cut off, you only see its start. If it lists a file as not shown, you can't see it at all. Say so, and ask what they need help with in it. Don't guess at its contents. If <files> says you couldn't read their files, say so and ask what they're working on.
  - If a file says (empty file), it exists but has nothing in it yet.
  - If the student sends only code, or only an error with no question: for an error, explain it as usual. For code with no error, ask one short question first: "What did you expect it to do, and what happened instead?" You may name one obvious mistake (like a missing closing tag) in the same reply, but don't rewrite their page until you know what they want.

  ## Diagnosing

  **First, check the assignment.** If the assignment is about finding bugs (its name or guide says "Find the Bug", "bug hunt", "debug", "what's wrong", or similar), spotting the bug IS the lesson. Don't point straight at it. Use this ladder, one step per reply, and only go down a step after they've tried:
  1. Ask which page or file they're on, and what they expected vs. what they see in the preview.
  2. Point to WHERE to look (the part of the page or the CSS rule), not WHAT is wrong.
  3. Name the kind of thing involved (for example "the tag that wraps your navigation links"), still not the fix.
  4. Only if they're still stuck: say what's wrong in one sentence and let them make the fix.
  Never give fixes for more than one bug in a reply. If they say you're not helping, say sorry in a few words and give the next step of the ladder, not the answer.
  On other assignments, the direct diagnosing rules below still apply.

  **Bugs in code they already wrote: be direct.** Missing or mismatched closing tags, bad nesting, missing alt text, typos in tag, attribute, property or selector names, a missing quote, semicolon or curly brace, a wrong file path, a class in the CSS that doesn't match the class in the HTML: say what is wrong and point to the exact line. You may show the corrected version of a line THEY already wrote. This is for fixing their line, never for writing a line they haven't tried yet.

  ## Short pages: one rule can be the whole answer

  Many tasks in this class are only a few lines, so one "small" snippet can be the entire step. Before you show any code, compare it with the task in the <guide>: if your snippet plus their code would finish the step, don't show it. Show the idea with different names and values instead, and let them write their own.

  **The skills the lessons teach: they write them.** These are NOT small fixes:
  - choosing which tags to use for the page's structure (headings, lists, a nav, sections)
  - writing a CSS selector and rule for an element
  - linking the stylesheet to the HTML page
  - building a layout (centering, putting things in a row, columns, spacing)
  For these, ask for their plan in words first, then show a parallel example with different names and values, or a template with blanks. Never write it with their own class names, colors and text filled in, and don't open with a numbered recipe: that recipe IS the answer. "How do I make a navigation bar?" or "Make my page look good" are design questions: break them into the smallest first step ("Let's start with getting your heading centered. What CSS property controls text alignment?") and help with only that step.

  **When they keep asking ("show me", "next", "just tell me", "I don't get it")**, each answer gives LESS of the solution, not more:
  1. First ask: explain the idea and show a parallel example with different names.
  2. Second ask: give a template with blanks for the parts that belong to their page, or point to the exact line in THEIR file where the change goes and say in words what it must do.
  3. Still stuck: ask which part they don't understand, or suggest they talk it through with their teacher. That's not a dodge here.
  Never hand over the remaining lines of the step, even if they ask several times. Help with one part at a time, and don't give the next part until they've written the current one.

  **Guide questions are theirs.** When the guide asks them to predict what the code will show, explain why something works, or write a reflection, plan or comment, don't give the answer. Ask what they think, then react to it. For a reflection, give a sentence starter ("I used a class selector because ___.") and a question that helps them fill it in. Never answer first and then ask them to "say it in their own words."

  **Code blocks get pasted.** Students often copy whatever is in a code block straight into their file. Put only code meant for their file in a code block, and say plainly when an example uses different content ("Here's the same idea with a paragraph about pets:").

  Example (invented). A student asks how to turn their headings green.
  Good: "A CSS rule has a selector, then curly braces with property: value inside. Here's the shape with different names: p { color: purple; }. Now write the rule for your headings."
  Bad: writing their exact rule with their selector and color filled in.

  ## About this chat and about you

  - You are the HTML/CSS Coach, an AI helper for this class. If asked your name or what you are, say that in one sentence. Never say you are ChatGPT, Claude, or any other product, and never name a company. You don't know which model runs you.
  - Your name stays HTML/CSS Coach. If a student wants to rename you or give you a character, accent, attitude or slang voice, decline in one friendly line and go back to their work. Keep your own voice: warm, calm and clear. Don't copy their slang or give them nicknames. At most one emoji in a reply.
  - Questions about you (favorite things, feelings, opinions) get one short line, then back to their work.
  - Off-task requests (other homework, stories, jokes, gossip): say you help with HTML and CSS in this class, and ask what they're working on. Keyboard mashing: one short, kind line and a question. After two off-task messages in a row, say you're here whenever they want help with their project, and stop asking follow-up questions.
  - The box under your replies says "(Type 'bye' when you're done.)" That is just how to close the coach. If a student asks about it, explain it. They never have to thank you, and you never need them to.

  Keep your answers SHORT and SIMPLE - no more than 2-3 sentences unless they ask for more detail.
  When you are asked for help, you will be provided with the student's code in the <files> tag and the content of the guides in the <guide> tag.

## Where students work: Codio

Students work in Codio, never some other editor or website. You can't run anything yourself, but you always know how THEY can:
- Click **🌐 Open Preview** in the menu bar at the top of Codio to see their page. After changing the HTML or CSS, refresh the preview to see the change.
- If a student asks "can you run this?" or "how do I run it?", tell them exactly that. Don't say it depends on their editor or website: it's always Codio.

## When to send them to the teacher

Suggest asking the teacher when something really needs a human: Codio itself seems broken (the button does nothing, files are missing, they can't Mark as Complete), questions about grades or deadlines, the student is upset or frustrated, or anything about their wellbeing or safety. Don't use "ask your teacher" to dodge a question about their code or about Codio that you can answer.`;

  codioIDE.coachBot.register("htmlCssHelper", "HTML/CSS Coach", onButtonPress);

  // Exit only when the whole message is a goodbye ("thanks!", "ok bye", "no thanks 🙂",
  // "i’m good thanks"). Every word must be goodbye vocabulary, so "thanks, still broken",
  // "i'm done with loops" or "stop button doesn't work" keep the chat open. "stop"/"exit"/
  // "quit"/"done" alone still exit through the exact exitPhrases list.
  const exitPhrases = ["thanks", "thank you", "bye", "goodbye", "done", "exit", "quit", "stop", "no thanks", "i'm good", "im good", "that's all", "thats all"];
  const goodbyeWords = ["thanks", "thank", "you", "thx", "ty", "bye", "goodbye", "cya", "no", "ok", "okay",
    "cool", "great", "alright", "all", "that's", "thats", "i'm", "im", "good", "done", "for", "now",
    "see", "ya", "later", "so", "much", "then", "very", "lot", "a"];
  const goodbyeCores = ["thanks", "thank", "thx", "ty", "bye", "goodbye", "cya"];
  const goodbyePhrases = ["i'm good", "im good", "i'm done", "im done", "that's all", "thats all", "see ya", "see you"];
  function isExitMessage(text) {
    if (typeof text !== "string") return false;
    if (text.indexOf("?") !== -1) return false;
    const norm = text.toLowerCase().replace(/[‘’]/g, "'").replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ").trim();
    if (!norm) return false;
    if (exitPhrases.includes(norm)) return true;
    const words = norm.split(" ");
    if (words.length > 6) return false;
    if (!words.every(function(w) { return goodbyeWords.indexOf(w) !== -1; })) return false;
    const padded = " " + norm + " ";
    return words.some(function(w) { return goodbyeCores.indexOf(w) !== -1; }) ||
      goodbyePhrases.some(function(p) { return padded.indexOf(" " + p + " ") !== -1; });
  }

  // Collect .html/.css files via codioIDE.files — context.files only lists
  // files currently OPEN in the editor, and students often ask about their CSS
  // while only the HTML file is open (or the other way around).
  // codioIDE.workspace does NOT exist in the Custom Assistant runtime;
  // codioIDE.files is the supported channel:
  // https://codio.github.io/client/codioIDE.files.html
  // Returns { entries, skipped }: entries are { path, text } blocks; skipped lists file
  // names that can't be seen at all (budget ran out, or the read failed or timed out).
  // usedChars: characters already used by open-tab files, so they count against the budget.
  async function collectProjectFiles(skipPaths, usedChars) {
    const entries = [];
    const skipped = [];
    const totalBudget = 40000;
    let used = usedChars || 0;
    const F = codioIDE.files;
    if (!F || typeof F.getStructure !== "function" || typeof F.getContent !== "function") return { entries: entries, skipped: skipped };

    let files = [];
    try {
      files = findProjectFiles(await withTimeout(F.getStructure(), 8000, "structure"), "");
    } catch (e) {
      return { entries: entries, skipped: skipped };
    }

    for (const filePath of files) {
      if (skipPaths && skipPaths.has(normalizePath(filePath))) continue;
      if (used >= totalBudget) { skipped.push(filePath); continue; }

      try {
        const content = await withTimeout(F.getContent(filePath), 8000, "read " + filePath);
        if (typeof content !== "string") { skipped.push(filePath); continue; }
        if (content.length === 0) {
          entries.push({ path: filePath, text: `File: ${filePath}\n(empty file)` });
          continue;
        }
        const maxLen = Math.min(15000, totalBudget - used);

        let text;
        if (content.length <= maxLen) {
          text = `File: ${filePath}\n${content}`;
        } else {
          text = `File: ${filePath}\n${content.slice(0, maxLen)}\n(cut off after ${maxLen} characters)`;
        }
        used += text.length;
        entries.push({ path: filePath, text: text });
      } catch (e) {
        skipped.push(filePath); // unreadable or timed out: tell the model it can't see it
      }
    }

    return { entries: entries, skipped: skipped };
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

  // The exact text between the <files> tags from the last buildContextMessage()
  // call. Fingerprinted each turn to detect "student changed their files".
  let lastFilesBlock = "";

  // Build the context-bearing first message from a fresh getContext() +
  // codioIDE.files read. Re-run before every ask() so the coach sees the
  // student's latest edits, not their code as of the button press.
  // isRefresh: on later turns the first question is labelled as such, so the
  // model doesn't treat it as the current one.
  async function buildContextMessage(question, isRefresh) {
    let context = {};
    try {
      context = (await withTimeout(codioIDE.coachBot.getContext(), 8000, "context")) || {};
    } catch (e) {
      if (isRefresh) throw e; // keep the previous context rather than swap in a worse one
      context = {}; // first turn: no open-tab files or guide; the project files are still read below
    }

    // Open editor files whose content we actually got (a non-string is unreadable:
    // it is left to the files reader below, and lands on "Not shown" if that fails too)
    const entries = [];
    const openPaths = new Set();
    let used = 0;
    (context.files || []).forEach(function(f) {
      if (!f || typeof f.content !== "string") return;
      const np = normalizePath(f.path);
      const text = `File: ${np}\n${f.content.length === 0 ? "(empty file)" : f.content}`;
      if (openPaths.has(np)) return; // dedupe on the normalized path
      entries.push({ path: np, text: text });
      openPaths.add(np);
      used += text.length;
    });

    const projectFiles = await collectProjectFiles(openPaths, used);
    projectFiles.entries.forEach(function(e) { entries.push(e); });

    // Sorted by path so tab switches or getStructure order can't change the block
    // (priority order above only decided what fit the budget).
    entries.sort(function(a, b) { return a.path < b.path ? -1 : (a.path > b.path ? 1 : 0); });
    let filesContent = entries.map(function(e) { return e.text; }).join("\n\n");
    if (projectFiles.skipped.length > 0) {
      filesContent += (filesContent ? '\n\n' : '') +
        "Not shown (too long to include, or couldn't be read): " + projectFiles.skipped.join(", ");
    }

    if (!filesContent) {
      filesContent = "No files available.";
    }
    lastFilesBlock = filesContent;

    const guideContent = (context.guidesPage && context.guidesPage.content)
      ? context.guidesPage.content
      : "No guide available.";

    const assignmentName = (context.assignmentData && context.assignmentData.name)
      ? context.assignmentData.name
      : null;

    const ending = isRefresh
      ? `(The student's first question in this chat was: ${question}. Their newest message is the last one below.)`
      : `The student says: ${question}`;

    return `Here are the student's files (current as of their latest question):
<files>
${filesContent}
</files>
Here is the guide content:
<guide>
${guideContent}
</guide>
${assignmentName ? `\nAssignment: ${assignmentName}\n` : ''}
${ending}`;
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

  // Short, stable fingerprint of the files block the model sees (FNV-1a, 8 hex chars).
  // Logged per turn so a later review can tell "student fixed it" from "coach saw stale files".
  function fingerprint(text) {
    const s = String(text || "");
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return { len: s.length, hash: ("0000000" + h.toString(16)).slice(-8) };
  }

  // Bound any files-API call so a hung deleteFiles/add/getContent can't stall the coach.
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function withTimeout(promise, ms, label) {
    let t;
    const timeout = new Promise((_, rej) => { t = setTimeout(() => rej(new Error("timeout: " + label)), ms); });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
  }

  // Confirm a write really landed — Codio's deleteFiles()+add() overwrite can land
  // a 0-byte file while add() throws nothing (observed live Aug 2026: the shared
  // .coach-log.json was wiped to 0 bytes). Verify by length (tolerant of trailing-
  // newline normalization), not exact match.
  async function readbackOk(F, path, content) {
    if (typeof F.getContent !== "function") return true;
    try {
      const got = await withTimeout(F.getContent(path), 8000, "read " + path);
      return typeof got === "string" && got.length > 0 && got.length >= content.length - 4;
    } catch (e) {
      return false;
    }
  }

  // Write and VERIFY. add() can't overwrite, so an existing file needs
  // deleteFiles()+add — but that add can land empty if the delete hasn't settled,
  // so pause, re-add, read back, and retry. Never reports success on an empty write.
  async function addVerified(F, path, content) {
    try {
      await withTimeout(F.add(path, content), 8000, "add " + path);
      if (await readbackOk(F, path, content)) return true;
    } catch (e) {}
    if (typeof F.deleteFiles !== "function") return false;
    for (let attempt = 0; attempt < 5; attempt++) {
      try { await withTimeout(F.deleteFiles([path]), 8000, "del " + path); } catch (e) {}
      await delay(150 + attempt * 150);
      try { await withTimeout(F.add(path, content), 8000, "add " + path); } catch (e) {}
      if (await readbackOk(F, path, content)) return true;
      await delay(150);
    }
    return false;
  }

  async function saveSessionHistory(history) {
    const F = codioIDE.files;
    if (!F || typeof F.add !== "function") return;
    const text = JSON.stringify(history, null, 2);
    await addVerified(F, SESSION_LOG_PATH, text);
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

  // ============================================================
  // Strict mode: a nudge toward trying first for students who lean on the coach.
  // Turned on from this workspace's own .coach-log.json history, never from a
  // list of students. It changes only the advice in STRICT_PROMPT; the coach still
  // helps on every question and never mentions a mode, limit or count. Thresholds
  // are here so the monthly review can tune them.
  // ============================================================
  const STRICT_WORKSPACE_QUESTIONS = 20; // questions logged in this workspace by this coach...
  const STRICT_WORKSPACE_DAYS = 14;      // ...in sessions that started within this many days
  const STRICT_SESSION_QUESTIONS = 10;   // questions in the current session
  const STRICT_RECENT_WINDOW = 8;        // look at the last N questions...
  const STRICT_RECENT_NEXT_STEP = 5;     // ...and turn on if this many are "next step" asks
  const STRICT_RELEASE_ATTEMPTS = 2;     // own attempts in a row that turn it off for the session

  const NEXT_STEP_PATTERNS = [
    /^(ok(ay)? )?(so )?(what'?s |what is )?(the )?next( step| part| one)?( please| pls)?$/,
    /^(ok(ay)? )?(and )?then what$/,
    /^(what goes |the )?next (line|bit)$/,
    /^what goes next$/,
    /^(keep going|continue|go on|more)( please| pls)?$/,
    /^(and|ok) (then|now)$/,
    /^(idk|i don'?t know|i dunno)( what to do| what to write)?$/,
    /\bshow me\b/,
    /\bwhat (do|should|can) i (write|type|put|add|do|drag|click|use)\b/,
    /\b(what|which) blocks? (do|should|can) i (use|add|drag|put|need)\b/,
    /^which blocks?$/,
    /\bwhat'?s the (code|answer)\b/,
    /\bwhat now\b/,
    /\bnow what\b/,
    /\bis (this|it|that|my code|mine) (right|correct|good|ok|okay)$/,
    /\bjust tell me\b/,
    /\b(give|write|tell) me the (code|answer|line|blocks?)\b/,
    /\b(can|could) you (just )?(write|code|do|make|finish) (it|this|that|the [a-z ]+|my [a-z ]+) for me\b/,
    /\bdo it for me\b/,
    /^(can (you|u) )?(just )?fix (it|this|that|my [a-z]+)( for me)?( please| pls)?$/,
    /^can (you|u) (just )?do it$/
  ];

  function normalizeAsk(text) {
    return String(text || "").toLowerCase().replace(/[‘’]/g, "'").replace(/[^a-z0-9' ?\n]+/g, " ").replace(/[ \t]+/g, " ").trim();
  }

  const CODE_WORDS = ["if", "elif", "else", "for", "in", "while", "def", "return", "and", "or", "not", "is", "import", "from", "as", "true", "false", "none", "pass", "break", "with", "class", "let", "const", "var", "function"];

  // A paste of code with no question, no error and no sentence of their own in it.
  // A non-code line with 3+ plain words (outside quotes and comments) counts as their own
  // words ("my plan: ask for a number", "it prints twice"), so it isn't a bare paste.
  function isBarePaste(text) {
    const s = String(text || "");
    if (s.length < 12 || s.indexOf("?") !== -1) return false;
    if (!/[=(){}\[\]:<>;]/.test(s)) return false; // no code characters: it's prose, not a paste
    if (/error|traceback|exception|\b(why|how|what|where|help|doesn'?t|isn'?t|won'?t|can'?t|stuck|wrong|broken|not|nothing|still|instead|but|working|tried|plan)\b/i.test(s)) return false;
    return !s.split("\n").some(function(line) {
      const bare = line.replace(/(["'])(?:(?!\1).)*\1/g, " ").replace(/(#|\/\/).*$/, " ");
      if (/[=(){}\[\]:<>;+*\/-]/.test(bare)) return false; // a code line
      const plain = bare.split(/\s+/).filter(function(w) { return /^[a-z]+[.,!]?$/i.test(w) && CODE_WORDS.indexOf(w.toLowerCase()) === -1; });
      return plain.length >= 3;
    });
  }

  function isNextStepPhrase(text) {
    const norm = normalizeAsk(text).replace(/\?/g, "").trim();
    if (!norm || norm.split(/\s+/).length > 10) return false;
    if (/error|traceback|\b(run|running|tried|try|plan)\b/.test(norm)) return false; // normal help
    return NEXT_STEP_PATTERNS.some(function(p) { return p.test(norm); });
  }

  function isNextStepAsk(text) {
    return isBarePaste(text) || isNextStepPhrase(text);
  }

  // The student is working on their own: they changed their files, or wrote a real
  // message (a plan, an explanation, a specific question) instead of a "next" ask.
  function isOwnAttempt(text, filesChanged) {
    if (isNextStepPhrase(text)) return false;
    if (filesChanged) return true; // they edited their work (a paste after an edit counts)
    if (isBarePaste(text)) return false;
    return normalizeAsk(text).split(/\s+/).filter(Boolean).length >= 6;
  }

  // Returns the threshold that fired ("workspace", "session" or "next-steps"), or null.
  function strictTrigger(history, session) {
    let workspaceCount = 0;
    let recent = [];
    for (let i = 0; i < history.length; i++) {
      const s = history[i];
      if (!s || typeof s !== "object" || s.coach !== COACH_ID) continue; // this coach's sessions only
      const qs = Array.isArray(s.questions) ? s.questions : [];
      const startedMs = Date.parse(s.started);
      if (s !== session && !(startedMs > Date.now() - STRICT_WORKSPACE_DAYS * 86400000)) continue; // old or undated
      workspaceCount += (typeof s.exchanges === "number" && s.exchanges >= qs.length) ? s.exchanges : qs.length;
      recent = recent.concat(qs.filter(function(q) { return typeof q === "string"; }));
    }
    if (workspaceCount >= STRICT_WORKSPACE_QUESTIONS) return "workspace";
    if ((session.exchanges || 0) >= STRICT_SESSION_QUESTIONS) return "session";
    const last = recent.slice(-STRICT_RECENT_WINDOW);
    if (last.filter(isNextStepAsk).length >= STRICT_RECENT_NEXT_STEP) return "next-steps";
    return null;
  }

  // Call once per question, after recordTurn() (so `history` includes this session and
  // this question). Updates the session's log fields; the next queued save carries them.
  function updateStrict(state, history, session, latestText, filesChanged) {
    if (state.released) return state; // off for the rest of this session
    if (state.on) {
      state.attemptStreak = isOwnAttempt(latestText, filesChanged) ? state.attemptStreak + 1 : 0;
      if (state.attemptStreak >= STRICT_RELEASE_ATTEMPTS) {
        state.on = false;
        state.released = true;
        session.strictReleased = true;
      }
      return state;
    }
    const reason = strictTrigger(history, session);
    if (reason) {
      state.on = true;
      state.reason = reason;
      state.attemptStreak = 0;
      session.strict = true;
      session.strictReason = reason;
    }
    return state;
  }

  const STRICT_PROMPT = `

## Right now: help this student try first

This student has been leaning on you for the next step. Stay warm and keep helping with every question, but nudge them to try first.
- Same as always: explain what an error message means and which line it points to, explain an idea, give a short example with different names or data, point out a typo or missing punctuation, and help them find a block, menu or button, and tell them how to run their work.
- For "what do I write", "next" or "show me" questions, first ask one short question back ("What do you think the next step is?" or "What did you try?") and wait for their answer. If they answer with a real attempt, even a wrong one, help as usual from there.
- Don't write the lesson's main step in their own work (their condition, their loop, their counter, their blocks). Show the pattern with different names and let them adapt it. If they ask twice for that step, give a parallel example, not their finished line. Fixing a typo or missing punctuation in a line they already wrote is still fine.
- After about three "next step" asks in a row, suggest they run what they have and see what happens, or ask them to explain their plan in one sentence.
- If they've been stuck on the same thing for three or more turns, kindly suggest their teacher, for example: "This one might be easier to sort out with your teacher. If you're in class, ask them now. If you're working at home, send them a message about where you're stuck." That's a suggestion, never a refusal. Keep helping too.
- Never mention a mode, a limit or how many questions they've asked, and never refuse. You're a coach who wants them to try first.`;
  // Returns the parsed history, [] when the file doesn't exist or is empty, or null when the
  // file exists but couldn't be read/parsed. null disables saving for this session so a
  // transient read failure can never overwrite (wipe) everyone's history.
  async function loadSessionHistory() {
    const F = codioIDE.files;
    if (!F || typeof F.getContent !== "function") return null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const text = await withTimeout(F.getContent(SESSION_LOG_PATH), 8000, "read log");
        if (typeof text !== "string" || !text.trim()) return [];
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : null;
      } catch (e) {
        await delay(300);
      }
    }
    // Both reads failed: only start fresh if the file really isn't there.
    try {
      if (typeof F.getStructure === "function") {
        const tree = await withTimeout(F.getStructure(), 8000, "structure");
        if (tree && typeof tree === "object" && Object.keys(tree).length > 0 && !(SESSION_LOG_PATH in tree)) return [];
      }
    } catch (e) {}
    return null;
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

      if ((initialInput || "").trim().toLowerCase() === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      if (!(initialInput || "").trim()) continue; // blank message: ignore

      if (isExitMessage(initialInput)) {
        // Goodbye as the very first message: no ask(), no log session.
        codioIDE.coachBot.write("Okay, bye! Come back any time you want help.");
        codioIDE.coachBot.showMenu();
        return;
      }

      break;
    }

    let sessionHistory = await loadSessionHistory();
    const logEnabled = sessionHistory !== null;
    if (!logEnabled) sessionHistory = [];
    const session = {
      coach: COACH_ID,
      started: new Date().toISOString(),
      updated: null,
      ended: null,
      coachVersion: VERSION,
      exchanges: 0,
      questions: [],
      contextFingerprints: [],
      failedReplies: 0,
      strict: false,
      strictReason: null,
      strictReleased: false
    };
    const strictState = { on: false, reason: null, released: false, attemptStreak: 0 };
    sessionHistory.push(session);

    async function recordTurn(question) {
      session.exchanges += 1;
      if (session.questions.length < MAX_LOGGED_QUESTIONS) {
        session.questions.push(String(question).slice(0, 300));
      }
      session.updated = new Date().toISOString();
      if (logEnabled) queueSave(sessionHistory); // fire-and-forget: never block the input loop on a log write
    }

    // lastAnsweredHash: the files hash the model last answered about. Kept in its own variable
    // (the logged array stops growing at the cap) and advanced only after a non-empty reply,
    // so a failed or empty turn still gets the "files changed" note on retry.
    let lastAnsweredHash = null;
    let currentHash = null;
    function recordFingerprint() {
      const fp = fingerprint(lastFilesBlock);
      currentHash = fp.hash;
      const changed = lastAnsweredHash !== null && fp.hash !== lastAnsweredHash;
      if (session.contextFingerprints.length < MAX_LOGGED_QUESTIONS) {
        session.contextFingerprints.push({ len: fp.len, hash: fp.hash, changed: changed });
      }
      return changed;
    }
    function recordRefreshFailed() {
      currentHash = null;
      if (session.contextFingerprints.length < MAX_LOGGED_QUESTIONS) {
        session.contextFingerprints.push({ len: null, hash: null, changed: false, refreshFailed: true });
      }
    }
    function markAnswered() { if (currentHash !== null) lastAnsweredHash = currentHash; }

    // Fallback context when the files can't be read at all: the coach still answers.
    function fallbackContext(question) {
      return "Here are the student's files (current as of their latest question):\n<files>\n" +
        "(I couldn't read the student's files just now.)\n</files>\nThe student says: " + question;
    }

    // First question: log it first, then build the context (a failed build can't drop it).
    await recordTurn(initialInput);
    let firstContext;
    try {
      firstContext = await buildContextMessage(initialInput, false);
      recordFingerprint();
    } catch (e) {
      firstContext = fallbackContext(initialInput);
      recordRefreshFailed();
    }
    updateStrict(strictState, sessionHistory, session, initialInput, false);

    {
      messages.push({
          "role": "user",
          "content": firstContext
      });

      try {
        codioIDE.coachBot.showThinkingAnimation();
        const result = await codioIDE.coachBot.ask({
          systemPrompt: strictState.on ? systemPrompt + STRICT_PROMPT : systemPrompt,
          messages: messages
        }, {preventMenu: true});
        const reply = (result && typeof result.result === "string") ? result.result : "";
        if (!reply.trim()) {
          // Never keep an empty assistant turn: an empty message in the history can make every
          // later ask() fail too (seen live: one session got 10 empty replies in a row).
          session.failedReplies = (session.failedReplies || 0) + 1;
          codioIDE.coachBot.write("Hmm, I didn't get an answer that time. Please ask again!");
          messages.pop();          // drop the user turn that got no answer
        } else {
          messages.push({"role": "assistant", "content": reply});
          markAnswered();
        }
      } catch (e) {
        session.failedReplies = (session.failedReplies || 0) + 1;
        codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
        messages.pop();
      } finally {
        codioIDE.coachBot.hideThinkingAnimation();
      }
    }

    while (true) {
      let input;
      try {
        input = await codioIDE.coachBot.input("What else can I help you with? (Type 'bye' when you're done.)");
      } catch (e) {
        break;
      }

      if ((input || "").trim().toLowerCase() === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      if (!(input || "").trim()) continue; // blank message: ignore

      if (isExitMessage(input)) {
        break;
      }

      let changed = false;
      if (messages.length === 0) {
        // The first reply failed, so there is no context message yet. Treat this as the
        // first question: build the context around the new input (don't lose it).
        initialInput = input;
        await recordTurn(input); // log first: a failed build can't drop the question
        let ctx;
        try {
          ctx = await buildContextMessage(input, false);
          recordFingerprint();
        } catch (e) {
          ctx = fallbackContext(input);
          recordRefreshFailed();
        }
        updateStrict(strictState, sessionHistory, session, input, false);
        messages.push({ "role": "user", "content": ctx });
      } else {
        // Refresh the context block so the coach sees the student's latest edits
        try {
          const ctx = await buildContextMessage(initialInput, true);
          changed = recordFingerprint();
          messages[0] = { "role": "user", "content": ctx };
        } catch (e) {
          // Keep the previous context if the refresh fails
          changed = false;
          recordRefreshFailed();
        }
        await recordTurn(input);
        updateStrict(strictState, sessionHistory, session, input, changed);

        messages.push({
            "role": "user",
            "content": changed
              ? "(Note: the student's files have changed since your last reply.)\n\n" + input
              : input
        });
      }

      try {
        codioIDE.coachBot.showThinkingAnimation();
        const result = await codioIDE.coachBot.ask({
          systemPrompt: strictState.on ? systemPrompt + STRICT_PROMPT : systemPrompt,
          messages: messages
        }, {preventMenu: true});
        const reply = (result && typeof result.result === "string") ? result.result : "";
        if (!reply.trim()) {
          session.failedReplies = (session.failedReplies || 0) + 1;
          codioIDE.coachBot.write("Hmm, I didn't get an answer that time. Please ask again!");
          messages.pop();
          continue;
        }
        messages.push({"role": "assistant", "content": reply});
        markAnswered();
      } catch (e) {
        session.failedReplies = (session.failedReplies || 0) + 1;
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
    if (logEnabled) await queueSave(sessionHistory); // flush queued writes (safe to await — no input follows)

    codioIDE.coachBot.write("Okay, bye! Come back any time you want help.");
    codioIDE.coachBot.showMenu();
  }
})(window.codioIDE, window);
